import { FC, useState } from 'react';
import { LucideImage, LucideX } from 'lucide-react';
import { Button } from './ui/button';
import EmojiPicker from 'emoji-picker-react';

type EmojiPickerPopupProps = {
  icon: string | undefined;
  onSelect: (selectedIcon: string) => void;
};

const EmojiPickerPopup: FC<EmojiPickerPopupProps> = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePopup = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleEmojiPicker = (emoji: { imageUrl: string }) => {
    onSelect(emoji?.imageUrl || '');
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={handlePopup}
      >
        <div className="size-12 flexCenter text-2xl bg-purple-50 text-primary rounded-lg">
          {icon ? <img src={icon} alt="Icon" className="" /> : <LucideImage />}
        </div>
      </div>

      <p className="">{icon ? 'Change Icon' : 'Pick Icon'}</p>

      {isOpen && (
        <div className="relative ">
          <Button
            className="absolute -top-2 -right-2 z-10 size-7 flexCenter border border-gray-200 rounded-full bg-white cursor-pointer"
            onClick={handlePopup}
          >
            <LucideX />
          </Button>

          <EmojiPicker open={isOpen} onEmojiClick={handleEmojiPicker} />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
