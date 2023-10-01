import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as Icons from "lucide-react";

interface UserAvatarProps extends AvatarProps {
  user: any;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  // console.log(user.image);

  return (
    <Avatar {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.User className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
