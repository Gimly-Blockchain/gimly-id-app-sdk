export const credentialMock = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://sphereon-opensource.github.io/vc-contexts/gimly/youtube/youtube-channel-owner.jsonld"
  ],
  "id": "1872",
  "type": ["VerifiableCredential", "YoutubeChannelOwner"],
  "issuer": "did:ethr:ropsten:0x028360fb95417724cb7dd2ff217b15d6f17fc45e0ffc1b3dce6c2b8dd1e704fa98",
  "issuanceDate": "2021-07-10T01:23:24Z",
  "credentialSubject": {
    "id": "did:ethr:ropsten:0x03f8b96c88063da2b7f5cc90513560a7ec38b92616fff9c95ae95f46cc692a7c75",
    "YoutubeChannelOwner": {
      "firstName": "John",
      "lastName": "Doe",
      "youtubeChannelName": "Teddy Kittens",
      "youtubeChannelId": "UCMFSkaC6CgOh4L3IcVP2P8g",
      "youtubeChannelCreationDate": "2018-02-01T23:01:44Z",
      "youtubeChannelImageURL": "https://yt3.ggpht.com/ytc/AKedOLTtFIzWxg7nYyzagwI2B-MP1lj4QzXMzUjHoRO9-Q=s88-c-k-c0x00ffffff-no-rj",
      "youtubeChannelURL": "https://www.youtube.com/channel/UCMFSkaC6CgOh4L3IcVP2P8g"
    }
  }
}
