export interface WebAppInitData {
  /**
   * A unique identifier for the Web App session, required for sending messages via the answerWebAppQuery method.
   */
  query_id?: string;
  /**
   * An object containing data about the current user.
   */
  user?: WebAppUser;
  /**
   * An object containing data about the chat partner of the current user in the chat where the bot was launched via the attachment menu. Returned only for Web Apps launched via the attachment menu.
   */
  receiver?: WebAppUser;
  /**
   * The value of the startattach parameter, passed via link. Only returned for Web Apps when launched from the attachment menu via link.
   */
  start_param?: string;
  /**
   * Unix time when the form was opened.
   */
  auth_date: number;
  /**
   * A hash of all passed parameters, which the bot server can use to check their validity.
   */
  hash: string;
}

export interface WebAppUser {
  /**
   * A unique identifier for the user or bot.
   */
  id: number;
  /**
   * True, if this user is a bot. Returns in the receiver field only.
   */
  is_bot?: boolean;
  /**
   * First name of the user or bot.
   */
  first_name: string;
  /**
   * Last name of the user or bot.
   */
  last_name?: string;
  /**
   * Username of the user or bot.
   */
  usernames?: string;
  /**
   * IETF language tag of the user's language. Returns in user field only.
   */
  language_code?: string;
  /**
   * URL of the user’s profile photo. The photo can be in .jpeg or .svg formats. Only returned for Web Apps launched from the attachment menu.
   */
  photo_url?: string;
}
