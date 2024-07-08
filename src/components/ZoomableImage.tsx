import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ZoomableImage({ url }) {
  return (
    <Dialog>
      <DialogTrigger>
        <img
          src={url}
          width={600}
          height={400}
          alt="Project Image"
          className="w-full rounded-lg object-cover object-center cursor-pointer transition-transform duration-300 hover:scale-105"
        />
      </DialogTrigger>
      <DialogContent className="w-screen max-w-screen-lg">
        <DialogHeader>
          <DialogDescription>
            <div>
              <img
                src={url}
                alt="Project Image"
                className="w-full rounded-lg object-cover object-center"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ZoomableImage;
