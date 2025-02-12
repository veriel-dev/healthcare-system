interface Props {
  scanProgress: number;
}
export const ScanLines = ({ scanProgress }: Props) => {
  return (
    <div className="scan-lines__container">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="scan-lines__elements"
          style={{
            top: `${i * 10}%`,
            transform: `translateY(${scanProgress}vh)`,
            transition: 'transform 0.1s linear',
          }}
        />
      ))}
    </div>
  );
};
