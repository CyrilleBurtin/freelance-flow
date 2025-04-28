import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ColorPickerProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const TASK_COLOR = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
] as const;

const ColorPicker = ({ value, onChange, disabled }: ColorPickerProps) => {
  return (
    <FormItem>
      <FormLabel>Couleur</FormLabel>
      <FormControl>
        <div className="grid grid-cols-6 gap-2">
          {TASK_COLOR.map((color) => {
            return (
              <button
                key={color}
                type="button"
                className={`h-8 w-8 rounded-full border-2 ${
                  value === color ? 'border-black' : 'border-transparent'
                } ${color} hover:border-gray-400 focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:outline-none disabled:opacity-50`}
                onClick={() => onChange?.(color)}
                disabled={disabled}
                title={color}
                aria-label={`Sélectionner ${color}`}
              />
            );
          })}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ColorPicker;
