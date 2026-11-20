import { portfolio } from '../data/content';

export function Availability() {
  const confirmed = portfolio.availability.status === 'available';
  return (
    <p className={'availability' + (confirmed ? ' availability-confirmed' : '')}>
      <span className="availability-dot" aria-hidden="true" />
      {portfolio.availability.label}
    </p>
  );
}
