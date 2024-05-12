export type MixcloudPlayerProps = {
    autoPlay?: boolean;
    children?: React.ReactNode;
    listIndex?: number;
    showsData?: ShowsDataType;
    url?: string;
  };

  export type ShowsDataType = {
    label?: string;
    shows?: ShowItemType[];
  };

  export type ShowItemType = {
    url: string;
    key: string;
  };