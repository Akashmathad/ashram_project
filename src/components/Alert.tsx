import { FC } from 'react';
import { Button } from './ui/button';

interface AlertProps {
  handleSubmit: any;
  handleCancel: any;
  displayString: string;
  isLoading: boolean;
}

const Alert: FC<AlertProps> = ({
  handleCancel,
  handleSubmit,
  displayString,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <div className="p-4 flex flex-col gap-8">
          <h2 className="text-xl text-center">{displayString}</h2>
          <div className="flex gap-6">
            <Button
              onClick={() => handleCancel(false)}
              variant="secondary"
              className="w-full"
            >
              Cancel
            </Button>
            <Button
              isLoading={isLoading}
              onClick={() => handleSubmit()}
              className="w-full"
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
