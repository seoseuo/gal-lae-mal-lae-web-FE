// Header 컴포넌트
export default function Header({ text, icon }: { text: string; icon: string }) {
  return (
    <div>
      <p className="header">
        <img src={`/${icon}.svg`} alt={`${icon}-icon`} className="header-icon" />
        <span className="header-text bo">{text}</span>
      </p>
      <hr style={{ margin: "0 0 40px 0" }} />
    </div>
  );
}
