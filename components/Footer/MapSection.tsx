import GoogleMapsEmbed from '../GoogleMapsEmbed';

const MapSection = ({ address }: { address: string }) => (
  <div className="w-full md:w-1/3 space-y-5 text-center">
    <h4 className="text-xl font-semibold underline underline-offset-8 decoration-lime-500 mb-4">
      מפה
    </h4>
    <GoogleMapsEmbed
      address={address}
      classNames="w-full h-72 rounded-md overflow-hidden border border-gray-300 shadow-sm"
    />
  </div>
);

export default MapSection;
