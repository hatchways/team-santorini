interface CardTag {
  type: string;
}

interface CardAttachment {
  type: string;
}

export interface Card {
  _id: string;
  name: string;
  description: string;
  tags?: CardTag[];
  colorCode?: string;
  deadline?: Date;
  attachments?: CardAttachment[];
}
