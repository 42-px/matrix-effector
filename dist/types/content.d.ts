export declare enum MsgType {
    Audio = "m.audio",
    BadEncrypted = "m.bad.encrypted",
    Emote = "m.emote",
    File = "m.file",
    Image = "m.image",
    Notice = "m.notice",
    Text = "m.text",
    Video = "m.video",
    Location = "m.location"
}
export declare type Relation = {
    "m.in_reply_to"?: {
        event_id: string;
    };
};
export declare type TextContent = {
    body: string;
    msgtype: MsgType.Text;
    format: string;
    formatted_body: string;
    "m.relates_to"?: Relation;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Text;
    format?: undefined;
    formatted_body?: undefined;
    "m.relates_to"?: Relation;
    [customProperty: string]: any;
};
export declare type EmoteContent = {
    body: string;
    msgtype: MsgType.Emote;
    format: string;
    formatted_body: string;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Emote;
    format?: undefined;
    formatted_body?: undefined;
    [customProperty: string]: any;
};
export declare type NoticeContent = {
    body: string;
    msgtype: MsgType.Notice;
    format: string;
    formatted_body: string;
    "m.relates_to"?: Relation;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Notice;
    format?: undefined;
    formatted_body?: undefined;
    "m.relates_to"?: Relation;
    [customProperty: string]: any;
};
export declare type EncryptedFile = any;
export declare type ThumbnailInfo = {
    h: number;
    w: number;
    mimetype: string;
    size: number;
};
export declare type ImageInfo = {
    h: number;
    w: number;
    mimetype: string;
    size: number;
    thumbnail_url: string;
    thumbnail_file?: undefined;
    thumbnail_info: ThumbnailInfo;
} | {
    h: number;
    w: number;
    mimetype: string;
    size: number;
    thumbnail_url?: undefined;
    thumbnail_file: EncryptedFile;
    thumbnail_info: ThumbnailInfo;
};
export declare type ImageContent = {
    body: string;
    msgtype: MsgType.Image;
    info?: ImageInfo;
    url: string;
    file?: undefined;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Image;
    info?: ImageInfo;
    url?: undefined;
    file: EncryptedFile;
    [customProperty: string]: any;
};
export declare type FileInfo = {
    mimetype: string;
    size: number;
    thumbnail_url: string;
    thumbnail_file?: undefined;
    thumbnail_info: ThumbnailInfo;
} | {
    mimetype: string;
    size: number;
    thumbnail_url?: undefined;
    thumbnail_file: EncryptedFile;
    thumbnail_info: ThumbnailInfo;
};
export declare type FileContent = {
    body: string;
    msgtype: MsgType.File;
    filename?: string;
    info: FileInfo;
    url: string;
    file?: undefined;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.File;
    filename?: string;
    info: FileInfo;
    url?: undefined;
    file: EncryptedFile;
    [customProperty: string]: any;
};
export declare type AudioInfo = {
    duration: number;
    mimetype: string;
    size: number;
};
export declare type AudioContent = {
    body: string;
    msgtype: MsgType.Audio;
    info?: AudioInfo;
    url: string;
    file?: undefined;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Audio;
    info?: AudioInfo;
    url?: undefined;
    file: EncryptedFile;
    [customProperty: string]: any;
};
export declare type LocationInfo = {
    thumbnail_url: string;
    thumbnail_file?: undefined;
    thumbnail_info: ThumbnailInfo;
} | {
    thumbnail_url?: undefined;
    thumbnail_file: EncryptedFile;
    thumbnail_info: ThumbnailInfo;
};
export declare type LocationContent = {
    body: string;
    msgtype: MsgType.Location;
    geo_uri: string;
    info?: LocationInfo;
    [customProperty: string]: any;
};
export declare type VideoInfo = {
    duration: number;
    h: number;
    w: number;
    mimetype: string;
    size: number;
    thumbnail_url: string;
    thumbnail_file?: undefined;
    thumbnail_info: ThumbnailInfo;
} | {
    duration: number;
    h: number;
    w: number;
    mimetype: string;
    size: number;
    thumbnail_url?: undefined;
    thumbnail_file: EncryptedFile;
    thumbnail_info: ThumbnailInfo;
};
export declare type VideoContent = {
    body: string;
    msgtype: MsgType.Video;
    info?: VideoInfo;
    url: string;
    file?: undefined;
    [customProperty: string]: any;
} | {
    body: string;
    msgtype: MsgType.Audio;
    info?: VideoInfo;
    url?: undefined;
    file: EncryptedFile;
    [customProperty: string]: any;
};
export declare type BadEncryptedContent = {
    body: string;
    msgtype: MsgType.BadEncrypted;
    [customProperty: string]: any;
};
export declare type MessageContent = AudioContent | BadEncryptedContent | EmoteContent | FileContent | ImageContent | NoticeContent | TextContent | VideoContent | LocationContent | Record<string, never>;
