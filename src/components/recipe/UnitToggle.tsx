import { useUnitSystem } from '../../hooks/useUnitSystem';
import { UNIT_SYSTEMS } from '../../lib/units';
import { Segmented } from '../ui/Segmented';

export function UnitToggle({ hideLabel }: { hideLabel?: boolean }) {
  const [system, setSystem] = useUnitSystem();
  return <Segmented label="Measurements" options={UNIT_SYSTEMS} value={system} onChange={setSystem} hideLabel={hideLabel} />;
}
