export interface SSOAttributes {
    telephoneNumber: string;
    mail: string;
    uid: string;
    client_id: string;
    jpegPhoto: string;
    cuil: string;
    givenName: string;
    cn: string;
}

export interface SSOResponse {
    service: string;
    attributes: SSOAttributes;
    id: string;
    client_id: string;
} 