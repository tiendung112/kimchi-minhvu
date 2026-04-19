import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { RsvpForm } from "./RsvpForm";
import { GiftCards } from "./GiftCards";

export const Celebration = () => {
  return (
    <section id="rsvp" className="px-4 py-20 sm:px-5 sm:py-28">
      <div className="container mx-auto max-w-6xl">
        <SectionTitle
          eyebrow="Xác nhận tham dự"
          title="Gửi Lời Chúc"
          subtitle="Sự hiện diện của quý khách là niềm vinh hạnh của hai gia đình. Xin vui lòng phản hồi trước ngày 30/11/2025."
        />

        {/* Mobile: gifts first then RSVP. Desktop: RSVP left, gifts right */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={0.05} className="order-2 lg:order-1">
            <RsvpForm />
          </Reveal>
          <Reveal delay={0.15} className="order-1 lg:order-2">
            <GiftCards />
          </Reveal>
        </div>
      </div>
    </section>
  );
};
