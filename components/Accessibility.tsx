import Script from 'next/script';

export default function Accessibility() {
  return (
    <>
      {/* <Script
        src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        id="nagishli-inline"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
nl_pos = "bl";
nl_dir = "assets/nl-files/";
nl_contact = "n:Doron Hadad|p:050-4741117|u:h.d.law9+d:gmail.com‬|f:1533-5506545";
`,
        }}
      />
      <Script src="plugins/nagishli.js?v=2.3" strategy="afterInteractive" /> */}
      {/* license script for enable plugin */}
      <Script
        src="https://cdn.enable.co.il/licenses/enable-L54321qjxobf0xe0-0326-80309/init.js"
        strategy="afterInteractive"
      />
    </>
  );
}
