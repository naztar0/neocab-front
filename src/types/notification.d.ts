interface UserNotification extends Timestamps {
  id: number;
  text: string;
  read: boolean;
}
