import * as React from "react";
import Avatar from "@material-ui/core/Avatar";

interface CommonAvatarProps {
  alt?: string;
  src: string;
}

const CommonAvatar: React.FC<CommonAvatarProps> = (props) => {
  return <Avatar {...props} />;
};

export default CommonAvatar;
