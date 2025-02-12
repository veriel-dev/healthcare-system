export const formatDate = (value: string) => {
  const date = new Date(value);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedMonth = month.toString().padStart(2, '0');
  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${day}/${formattedMonth}/${year} ${formattedHour}:${formattedMinutes}:${formattedSeconds}`;
};
