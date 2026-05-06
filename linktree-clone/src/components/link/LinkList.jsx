import LinkCard from "./LinkCard";

export default function LinkList({ links }) {
  return (
    <div>
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}