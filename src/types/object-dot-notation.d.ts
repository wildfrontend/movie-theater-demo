/**
 * @see https://www.typescriptlang.org/play?ts=4.1.0-dev.20200921&ssl=11&ssc=1&pln=1&pc=1#code/C4TwDgpgBACghsAFgSQLZgDYB4AqAaKAaSggA9gIA7AEwGcoBrCEAewDMocA+KAXgCgoREuSp0otYACcAlpQDmgqAH5OAbUIBdERRr0AShADGLKdSyTZCgnEoguSoapwbtZXeICCUqXBAAZGSYsW3tHIRVhAB8oAAMAEgBvQgBfADok+CQ0TFxXAgBRUiMMAFdqCCwmVg4XLQJq9ihQtU0uLhTY8KEALmi4pNSMxKyUdGw6zQbmJsmOroioPsIlPsoIADcIKQBufn5QSFgERFweXmPs8dxpms4eGMbavYPwaFGANTgyyvxYHTE9FGZ3OShgAL0A0ScjY2yI6SSMLhhkknSUqmI7kBjBmtXCqhRwAh4mBc26kU+31Kv3yUEJDkWvSg6y2UnCa0221W-yxkKenHx6hgmnZzM5u32FRKcCk0DYpUoRmAMhYlCg8ggwBuPNEkNJ7QAFCwAEYAKz6fzAJz6MAAlDaTl8ftqYFwXiZKJIoCbTcYiRdEko2DIpJIAHJwVAQPoAIgAIjIIPIWDG8EoMHBw5Ho1AYwAJOAAL1TSjgGr6AGYAAxpoRgKQsX1K2h9NThRLM7OxwxwBgyYCpqAe6QyY2lYCmFtQABsAA4oClaxEO5Qu7mAMKqyQICCD4eyMcT0N9ACMACYF0uRSlmvQPZJ3VuiRsqdALhrgEazX6CDH642-VoNIqzSVcoxjW09nvFgMAgNIMBYeQDRfH5bSAA
 * @see https://twitter.com/diegohaz/status/1309489079378219009
 */

type PathImpl<T, K extends keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? T[K] extends ArrayLike<any>
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type ObjectDotNotation<T> = PathImpl<T, keyof T> | keyof T;
