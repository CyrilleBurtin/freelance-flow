import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ColorPickerProps {
  value?: string; // Selected color (e.g., 'red-500')
  onChange?: (value: string) => void; // Callback for when a color is selected
  disabled?: boolean; // Disable the picker
}

export const TASK_COLOR = [
  'red-500',
  'orange-500',
  'amber-500',
  'yellow-500',
  'lime-500',
  'green-500',
  'emerald-500',
  'teal-500',
  'cyan-500',
  'sky-500',
  'blue-500',
  'indigo-500',
  'violet-500',
  'purple-500',
  'fuchsia-500',
  'pink-500',
  'rose-500',
] as const;

const ColorPicker = ({ value, onChange, disabled }: ColorPickerProps) => {
  return (
    <FormItem>
      <FormLabel>Couleur</FormLabel>
      <FormControl>
        <div className="grid grid-cols-6 gap-2">
          {TASK_COLOR.map((color) => {
            // Convert 'red-500' to 'red' for the CSS variable
            const colorName = color.split('-')[0];
            return (
              <button
                key={color}
                type="button"
                className={`h-8 w-8 rounded-full border-2 ${
                  value === color ? 'border-black' : 'border-transparent'
                } hover:border-gray-400 focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 focus:outline-none disabled:opacity-50`}
                style={{
                  backgroundColor: `var(--color-picker-${colorName})`,
                }}
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
