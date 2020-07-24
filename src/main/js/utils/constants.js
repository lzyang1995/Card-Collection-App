export const LOCALSTORAGE_AUTH = "auth";
/** 
 * auth: store authentication and user information
 * 
 * properties:
 *  loggedIn: Boolean
 *  username: String
 *  nickname: String
 *  gender: String (male/female/other)
 *  phoneNumber: String
 *  password: String (BCrypt hash)
 * 
 */

export const SALT_ROUNDS = 10;
/** salt rounds for BCrypt */

export const PAGE_SIZE = 10;
/** page size for showing card draw history and help history */

export const SESSIONSTORAGE_INVITEURL = "inviteUrl";
/** Entry for storing invite Url. If login is originated from
 *  a invite url, then the page will be redirected back to the
 *  invite url rather than home page.
 */

export const MAX_HELP_TIME = 3;
/** maximum help time */

export const VERIFICATION_INPUT_CLASS = "verificationInput";
/** the className for verfification code input */