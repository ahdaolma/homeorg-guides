export default function AdSlot({ id }: { id: string }) {
  return (
    <div className="ad-slot" data-ad-slot={id}>
      {/* Replace with Google AdSense code after approval */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={id}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
