export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

export function utfChar(s: string) {
  return (s.codePointAt(0) || 0) >= 0xD800 ? s[0] + s[1] : s[0].toUpperCase();
}

export function colorChar(s: string, saturation = 50, level = 48) {
  let lt = s[0];
  if (!lt) return '';
  lt = utfChar(lt);
  return `hsl(${((lt.charCodeAt(0) - 65) * 360) / 26}deg, ${saturation}%, ${level}%)`;
}

export function yearToSemester(year: number, prev = false): number {
  return year ? year * 2 - (new Date().getMonth() > 8 ? 1 : 0)
    - (prev && yearToSemester(year) > 1 ? 1 : 0) : 0;
}

export function semesterToYear(semester: number, current: number): number {
  return semester ? new Date().getFullYear()
    - Math.floor(current / 2) + Math.floor((semester + 1) / 2)
    - (semester % 2 === 0 ? 0 : 1) : 0;
}

export function shortDepartmentName(name: string): string {
  if (!name) return '';
  const str = name.replace(/(-| +і +| +та +| +й +| +ім\..+)/ig, ' ').trim().split(' ');
  let res = '';
  for (let i = 0; i < str.length; i++) {
    res += str[i][0].toUpperCase();
  }
  return res;
}

export function toMark5(mark: number): number {
  if (mark < 60) return 2;
  if (mark < 75) return 3;
  if (mark < 90) return 4;
  return 5;
}

export function toMarkNational(mark: number): string {
  if (mark < 60) return 'fail';
  if (mark < 75) return 'satisfactory';
  if (mark < 90) return 'good';
  return 'excellent';
}

export function toMarkEcts(mark: number): string {
  if (mark < 35) return 'F';
  if (mark < 60) return 'FX';
  if (mark < 64) return 'E';
  if (mark < 75) return 'D';
  if (mark < 82) return 'C';
  if (mark < 90) return 'B';
  return 'A';
}

export function formatDate(date: string): string {
  const d = new Date(date);
  return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
}

export function formatZero(data: number): string {
  return data < 10 ? `0${data}` : data.toString();
}

export function getDate(date: string): Date {
  return new Date(`${date}Z`);
}

export function getDay(date: Date): number {
  return date.getDay() || 7;
}

export function formatName(user: User | null): string {
  if (!user) return '';
  const fn = user.first_name ? user.first_name[0] : '';
  const mn = user.middle_name ? user.middle_name[0] : '';
  return `${user.last_name} ${fn}. ${mn}.`;
}

export function getProfessorName(
  { professor, professor_name }: { professor: User | null, professor_name: string | null },
): string {
  if (professor) {
    return formatName(professor);
  }
  return professor_name || '';
}

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

export const isPrefersDark = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
