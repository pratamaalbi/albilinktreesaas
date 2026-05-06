export default function LinkCard({ link }) {
  return (
    <div>
      <a
        href={`http://localhost:5000/api/click/${link.id}`}
        target="_blank"
      >
        {link.title}
      </a>
    </div>
  );
}