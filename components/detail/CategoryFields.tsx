import type { Recommendation } from '@/lib/types'

interface FieldItem {
  label: string
  value: string | null | undefined
  icon?: string
}

function FieldGrid({ fields }: { fields: FieldItem[] }) {
  const visible = fields.filter(f => f.value && f.value !== 'No' && f.value.trim() !== '')
  if (visible.length === 0) return null

  return (
    <div className="mx-4 mb-5 bg-white rounded-2xl p-4 shadow-card">
      <p className="text-xs font-bold text-navy/40 uppercase tracking-widest mb-3">Details</p>
      <div className="grid grid-cols-2 gap-3">
        {visible.map(({ label, value, icon }) => (
          <div key={label} className="bg-cream rounded-xl p-3">
            <p className="text-[10px] text-navy/40 uppercase tracking-wide mb-0.5">{label}</p>
            <p className="text-navy text-sm font-medium leading-snug">
              {icon && <span className="mr-1">{icon}</span>}
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function BoolField(val: string | null | undefined): string | null {
  if (!val) return null
  return val.toLowerCase() === 'yes' ? '✓ Yes' : val.toLowerCase() === 'no' ? null : val
}

export default function CategoryFields({ item }: { item: Recommendation }) {
  const ef = (item.extraFields ?? {}) as Record<string, string | null>

  switch (item.category) {
    case 'restaurant':
      return <FieldGrid fields={[
        { label: 'Cuisine', value: ef.cuisine_type, icon: '🍽️' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Reservation', value: BoolField(ef.reservation_needed), icon: '📅' },
        { label: 'Outdoor Seating', value: BoolField(ef.outdoor_seating), icon: '🌿' },
      ]} />

    case 'bar':
      return <FieldGrid fields={[
        { label: 'Bar Type', value: ef.bar_type, icon: '🍸' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Live Music', value: ef.live_music, icon: '🎸' },
        { label: 'Outdoor Seating', value: BoolField(ef.outdoor_seating), icon: '🌿' },
        { label: 'Signature Drink', value: ef.signature_drink, icon: '✨' },
        { label: 'Happy Hour', value: ef.happy_hour, icon: '⏱️' },
      ]} />

    case 'rooftop':
      return <FieldGrid fields={[
        { label: 'Venue Type', value: ef.venue_type, icon: '🏨' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Best Time', value: ef.best_time, icon: '🌅' },
        { label: 'Views', value: ef.views, icon: '👀' },
        { label: 'Dress Code', value: ef.dress_code, icon: '👔' },
        { label: 'Reservation', value: BoolField(ef.reservation_needed), icon: '📅' },
        { label: 'Min. Spend', value: ef.minimum_spend ? `€${ef.minimum_spend}` : null, icon: '💶' },
      ]} />

    case 'club':
      return <FieldGrid fields={[
        { label: 'Music', value: ef.music_type, icon: '🎵' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Dress Code', value: ef.dress_code, icon: '👔' },
        { label: 'Entry Fee', value: ef.entry_fee, icon: '🎟️' },
        { label: 'Min. Age', value: ef.minimum_age, icon: '🔞' },
        { label: 'VIP Tables', value: BoolField(ef.vip_tables), icon: '⭐' },
        { label: 'Best Night', value: ef.best_night, icon: '📅' },
      ]} />

    case 'sports':
      return <FieldGrid fields={[
        { label: 'Activity', value: ef.activity_type, icon: '🎯' },
        { label: 'Difficulty', value: ef.difficulty_level, icon: '📊' },
        { label: 'Duration', value: ef.duration, icon: '⏱️' },
        { label: 'Season', value: ef.season, icon: '🗓️' },
        { label: 'Equipment', value: BoolField(ef.equipment_needed), icon: '🎒' },
        { label: 'Equipment Rental', value: BoolField(ef.equipment_rental), icon: '🔄' },
        { label: 'Booking', value: BoolField(ef.booking_required), icon: '📅' },
        { label: 'Group Activity', value: BoolField(ef.group_activity), icon: '👥' },
        { label: 'Operator', value: ef.operator_name, icon: '🏢' },
      ]} />

    case 'cultural':
      return <FieldGrid fields={[
        { label: 'Type', value: ef.activity_type, icon: '🏛️' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Duration', value: ef.duration, icon: '⏱️' },
        { label: 'Ticket Price', value: ef.ticket_price ? `€${ef.ticket_price}` : null, icon: '🎟️' },
        { label: 'Free Entry', value: ef.is_free === 'Yes' ? '✓ Free' : null, icon: '🆓' },
        { label: 'Booking', value: BoolField(ef.booking_required), icon: '📅' },
        { label: 'Guided Tours', value: ef.guided_tours, icon: '🗺️' },
        { label: 'Accessibility', value: ef.accessibility, icon: '♿' },
        { label: 'Kid-Friendly', value: BoolField(ef.child_friendly), icon: '👶' },
      ]} />

    case 'kids':
      return <FieldGrid fields={[
        { label: 'Activity', value: ef.activity_type, icon: '🎡' },
        { label: 'Age Range', value: ef.age_range, icon: '👶' },
        { label: 'Duration', value: ef.duration, icon: '⏱️' },
        { label: 'Free Entry', value: ef.is_free === 'Yes' ? '✓ Free' : null, icon: '🆓' },
        { label: 'Adult Ticket', value: ef.ticket_adult ? `€${ef.ticket_adult}` : null, icon: '🎟️' },
        { label: 'Child Ticket', value: ef.ticket_child ? `€${ef.ticket_child}` : null, icon: '🎟️' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Indoor/Outdoor', value: ef.indoor_outdoor, icon: '🏠' },
        { label: 'Distance', value: ef.distance_from_center, icon: '📍' },
      ]} />

    case 'beach-club':
      return <FieldGrid fields={[
        { label: 'Zone', value: ef.location_zone, icon: '📍' },
        { label: 'Opening Hours', value: ef.opening_hours, icon: '🕐' },
        { label: 'Vibe', value: ef.vibe, icon: '✨' },
        { label: 'Music', value: ef.music_type, icon: '🎵' },
        { label: 'Min. Spend', value: ef.minimum_spend ? `€${ef.minimum_spend}` : null, icon: '💶' },
        { label: 'Day Entry', value: ef.day_entry_fee ? (ef.day_entry_fee === '0' ? 'Free' : `€${ef.day_entry_fee}`) : null, icon: '🎟️' },
        { label: 'Pool', value: BoolField(ef.has_pool), icon: '🏊' },
        { label: 'Restaurant', value: BoolField(ef.restaurant_onsite), icon: '🍽️' },
        { label: 'Dress Code', value: ef.dress_code, icon: '👔' },
        { label: 'Reservation', value: BoolField(ef.reservation_needed), icon: '📅' },
      ]} />

    default:
      return null
  }
}
