# Security Specification & Test-Driven Security Matrix

**Application:** Shivank Maurya — Full Stack Portfolio & RAG Knowledge Engine  
**Security Model:** ABAC, Principle of Least Privilege, Strict Identity Integrity

---

## 1. Data Invariants

1. **User Profile Ownership:** A document in `/users/{userId}` can only be read, created, or updated by the user whose UID matches `{userId}`, and only when `request.auth.token.email_verified == true`.
2. **Subcollection Inheritance:** Any document in `/users/{userId}/savedProjects/{projectId}` or `/users/{userId}/savedChats/{chatId}` inherits parent identity constraints — only `{userId}` can read, create, update, or delete.
3. **Inquiry Visibility:** An inquiry in `/inquiries/{inquiryId}` can only be created by an authenticated user matching `userId == request.auth.uid`. A non-admin user can only read their own inquiries (`resource.data.userId == request.auth.uid`). Only the verified portfolio administrator (`codewithshivank@gmail.com`) can list all inquiries and modify inquiry status.
4. **Endorsement Authenticity:** Endorsements in `/endorsements/{endorsementId}` can be created by authenticated visitors, but `userId` must strictly match `request.auth.uid`. Read is public to display community testimonials, but update/delete is prohibited or strictly limited to the author.
5. **No Blind Update Gaps:** All updates must validate payload schema, disallow altering immutable IDs (`id`, `userId`, `createdAt`), and use `affectedKeys().hasOnly()` gates.
6. **No Arbitrary Key Poisoning:** Prohibit injection of unauthorized fields (`isAdmin`, `role: 'admin'`, custom claims, etc.).

---

## 2. The "Dirty Dozen" Payloads

1. **Payload 1 (Identity Spoofing on User Profile):**
   ```json
   { "userId": "victim_uid_123", "email": "attacker@evil.com", "displayName": "Attacker", "createdAt": "2026-09-23T15:00:00Z", "updatedAt": "2026-09-23T15:00:00Z" }
   ```
   *Expected:* PERMISSION_DENIED (UID in document does not match `request.auth.uid`).

2. **Payload 2 (Unverified Email Write):**
   *Context:* `request.auth.token.email_verified == false`
   *Expected:* PERMISSION_DENIED.

3. **Payload 3 (Shadow Field Injection in User Profile):**
   ```json
   { "userId": "attacker_uid", "email": "valid@domain.com", "displayName": "Attacker", "isAdmin": true, "superUser": true, "createdAt": "2026-09-23T15:00:00Z", "updatedAt": "2026-09-23T15:00:00Z" }
   ```
   *Expected:* PERMISSION_DENIED (Fails strict key allowlist).

4. **Payload 4 (Foreign Subcollection Access - Saved Projects):**
   *Target:* `/users/victim_123/savedProjects/proj_1` with auth UID `attacker_456`.
   *Expected:* PERMISSION_DENIED.

5. **Payload 5 (Inquiry Impersonation):**
   *Payload:* `{ "id": "inq_1", "userId": "victim_123", "senderName": "Imposter", "senderEmail": "ceo@google.com", "position": "Staff Eng", "message": "Hire me", "status": "submitted", "createdAt": "2026-09-23T15:00:00Z" }`
   *Expected:* PERMISSION_DENIED (`userId != request.auth.uid`).

6. **Payload 6 (Privilege Escalation on Inquiry Status):**
   *Target:* User attempting to update status from `submitted` to `interview_scheduled`.
   *Expected:* PERMISSION_DENIED (Only admin `codewithshivank@gmail.com` can change status).

7. **Payload 7 (Denial-of-Wallet Payload Injection):**
   *Payload:* `{ "id": "inq_2", "userId": "my_uid", "senderName": "A", "senderEmail": "a@b.com", "position": "Dev", "message": "<200KB payload>", "status": "submitted", "createdAt": "2026-09-23T15:00:00Z" }`
   *Expected:* PERMISSION_DENIED (`message.size() > 2000`).

8. **Payload 8 (Path Traversal / Malicious ID Injection):**
   *Path:* `/users/../admin/users` or `/users/invalid$%#@id`
   *Expected:* PERMISSION_DENIED (`isValidId` regex fails).

9. **Payload 9 (Cross-User Inquiry Reading):**
   *Target:* `GET /inquiries/inquiry_of_user_A` as `user_B`.
   *Expected:* PERMISSION_DENIED (User B is neither owner nor admin).

10. **Payload 10 (Endorsement Tampering):**
    *Target:* `UPDATE /endorsements/end_1` attempting to alter `skillName` or `endorserName` by another user.
    *Expected:* PERMISSION_DENIED.

11. **Payload 11 (Immutable Field Mutation on Update):**
    *Payload:* Attempting to update `userId` or `createdAt` on an existing SavedProject.
    *Expected:* PERMISSION_DENIED.

12. **Payload 12 (Blanket List Query Scraping):**
    *Target:* `list /inquiries` without filtering by `userId == request.auth.uid` as non-admin.
    *Expected:* PERMISSION_DENIED.
