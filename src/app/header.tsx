// Header 컴포넌트
export default function Header({ text }: { text: string }) {
    return (
      <div className="header">
        <h1>{text}</h1>
      </div>
    );
  }
