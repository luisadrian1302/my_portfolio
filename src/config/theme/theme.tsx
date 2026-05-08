




export const getColours = (theme: string | undefined) => ({
  background: theme === 'light' ? '#f8fafc' : '#0e141b',
  primary: theme === 'light' ? '#1E293B' : '#0F172A',
  accent: theme === 'light' ? '#1A7CA7' : '#1A7CA7',
  accent2: theme === 'light' ? "#ff4d4d" : "#ff4d4d",
  text: theme === 'light' ? '#0F172A' : '#CBD5E1',
});
