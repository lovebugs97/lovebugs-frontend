import { RoleType } from 'auth-types';

export function isValidEmail(email: string): boolean {
  /* 이메일 검증 규칙 {p1}@{p2}.{p3}
   * - p1: 알파벳 대소문자, 숫자, 점(.) 포함해서 3자리 이상
   * - p2: p1과 동일
   * - p3: 최소 2자 이상의 알파벳
   * */
  const EMAIL_REGEX = /^[a-zA-Z0-9.]{3,}@[a-zA-Z0-9.]{3,}\.[a-zA-Z]{2,}$/;
  return EMAIL_REGEX.test(email);
}

export function isValidPassword(password: string): boolean {
  /* 비밀번호 검증 규칙
   * - 알파벳, 숫자, 특수문자로 이루어진 8 ~ 15개 문자열 (특수문자 1개 이상 포함)
   */
  const PASSWORD_REGEX = /^(?=.*[!@#$%^&*()>+{}?~])[a-zA-Z0-9!@#$%^&*()_+{}?~]{8,15}$/;
  return PASSWORD_REGEX.test(password);
}

export function isAuthenticated(currentRole: RoleType, needed: RoleType): boolean {
  return getRoleScore(currentRole) >= getRoleScore(needed);
}

function getRoleScore(role: RoleType): number {
  switch (role) {
    case 'ROLE_USER':
      return 0;
    case 'ROLE_IMPORTANT':
      return 1;
    case 'ROLE_VIP':
      return 2;
    case 'ROLE_ADMIN':
      return 3;
    default:
      return -1;
  }
}
