/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CognitoUserInput = {
  id: string,
  username?: string | null,
};

export type NoteItemInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  startDateTime?: string | null,
  recurringType?: string | null,
  email?: string | null,
  password?: string | null,
  expiryDate?: string | null,
  reminderDuration?: string | null,
  isActive?: boolean | null,
  reminderType?: Array< ContactInput | null > | null,
};

export type ContactInput = {
  id?: string | null,
  type?: string | null,
  userId?: string | null,
  content?: string | null,
  verifyStatus?: string | null,
  createdDateTime?: string | null,
  updatedDateTime?: string | null,
  isActive?: boolean | null,
};

export type FbAccountInput = {
  id?: string | null,
  userId?: string | null,
  longLiveToken?: string | null,
  igId?: string | null,
  pageAccessToken?: string | null,
  fbPageId?: string | null,
  llttokenExpiryDate?: string | null,
  name?: string | null,
  profilePictureUrl?: string | null,
  isActive?: boolean | null,
};

export type ChatbotInput = {
  id?: string | null,
  userId?: string | null,
  gptType?: string | null,
  title?: string | null,
  description?: string | null,
  socialAccounts?: Array< string | null > | null,
  platformType?: string | null,
  knowledgebase?: Array< string | null > | null,
  isActive?: boolean | null,
};

export type KnowledgebaseInput = {
  id?: string | null,
  title?: string | null,
  description?: string | null,
  content?: Array< string | null > | null,
  userId?: string | null,
  sourceType?: string | null,
  isActive?: boolean | null,
};

export type SketchInput = {
  id?: string | null,
  rawSketchImgPath?: string | null,
  generatedImages?: Array< string | null > | null,
  prompt?: string | null,
  object?: string | null,
  style?: string | null,
  createdDateTime?: string | null,
  updatedDateTime?: string | null,
  isActive?: boolean | null,
};

export type CognitoUser = {
  __typename: "CognitoUser",
  id: string,
  username: string,
  email?: string | null,
};

export type NoteItem = {
  __typename: "NoteItem",
  id: string,
  title: string,
  description: string,
  startDateTime: string,
  recurringType: string,
  cognitoUser: string,
  expiryDate?: string | null,
  email?: string | null,
  password?: string | null,
  reminderDuration?: string | null,
  reminderType?:  Array<Contact | null > | null,
};

export type Contact = {
  __typename: "Contact",
  id?: string | null,
  type?: string | null,
  userId?: string | null,
  content?: string | null,
  verifyStatus?: string | null,
  createdDateTime?: string | null,
  updatedDateTime?: string | null,
  isActive?: boolean | null,
};

export type FbAccount = {
  __typename: "FbAccount",
  id?: string | null,
  userId?: string | null,
  longLiveToken?: string | null,
  igId?: string | null,
  pageAccessToken?: string | null,
  fbPageId?: string | null,
  llttokenExpiryDate?: string | null,
  name?: string | null,
  profilePictureUrl?: string | null,
};

export type FbWebhook = {
  __typename: "FbWebhook",
  id?: string | null,
  userId?: string | null,
  accessToken?: string | null,
  socialId?: string | null,
  accountType?: string | null,
  tokenExpiryDate?: string | null,
  name?: string | null,
  profilePictureUrl?: string | null,
};

export type Knowledgebase = {
  __typename: "Knowledgebase",
  id?: string | null,
  title?: string | null,
  description?: string | null,
  content?:  Array<KnowledgebaseContent | null > | null,
  userId?: string | null,
  sourceType?: string | null,
  isActive?: boolean | null,
  createdDateTime?: string | null,
  updatedDateTime?: string | null,
};

export type KnowledgebaseContent = {
  __typename: "KnowledgebaseContent",
  id?: string | null,
  contentName?: string | null,
  content?: string | null,
};

export type Chatbot = {
  __typename: "Chatbot",
  id?: string | null,
  userId?: string | null,
  gptType?: string | null,
  title?: string | null,
  description?: string | null,
  socialAccounts?:  Array<FbAccount | null > | null,
  platformType?: string | null,
  knowledgebase?:  Array<Knowledgebase | null > | null,
  createdDateTime?: string | null,
  updatedDateTime?: string | null,
};

export type PresignedUrlRequestInput = {
  count: number,
  // Non-nullable integer
  mediaType?: string | null,
};

export type PresignedUrlResponse = {
  __typename: "PresignedUrlResponse",
  uploadUrls?: Array< string | null > | null,
};

export type UpdateCognitoUserMutationVariables = {
  cognitoUser: CognitoUserInput,
};

export type UpdateCognitoUserMutation = {
  updateCognitoUser?: string | null,
};

export type UpdateNoteItemMutationVariables = {
  noteItem: NoteItemInput,
};

export type UpdateNoteItemMutation = {
  updateNoteItem?: string | null,
};

export type CreateNoteItemMutationVariables = {
  noteItem: NoteItemInput,
};

export type CreateNoteItemMutation = {
  createNoteItem?: string | null,
};

export type UpdateSocialAccountMutationVariables = {
  fbAccount: FbAccountInput,
};

export type UpdateSocialAccountMutation = {
  updateSocialAccount?: string | null,
};

export type RemoveSocialAccountMutationVariables = {
  fbAccount: FbAccountInput,
};

export type RemoveSocialAccountMutation = {
  removeSocialAccount?: string | null,
};

export type CreateSocialAccountMutationVariables = {
  fbAccount: FbAccountInput,
};

export type CreateSocialAccountMutation = {
  createSocialAccount?: string | null,
};

export type CreateChatbotMutationVariables = {
  chatbot: ChatbotInput,
};

export type CreateChatbotMutation = {
  createChatbot?: string | null,
};

export type DeleteChatbotMutationVariables = {
  chatbot: ChatbotInput,
};

export type DeleteChatbotMutation = {
  deleteChatbot?: string | null,
};

export type CreateKnowledgebaseMutationVariables = {
  knowledgebase: KnowledgebaseInput,
};

export type CreateKnowledgebaseMutation = {
  createKnowledgebase?: string | null,
};

export type DeleteKnowledgebaseMutationVariables = {
  knowledgebase: KnowledgebaseInput,
};

export type DeleteKnowledgebaseMutation = {
  deleteKnowledgebase?: string | null,
};

export type CreateSketchMutationVariables = {
  sketchInput: SketchInput,
};

export type CreateSketchMutation = {
  createSketch?: string | null,
};

export type GetCognitoUserQuery = {
  getCognitoUser?:  {
    __typename: "CognitoUser",
    id: string,
    username: string,
    email?: string | null,
  } | null,
};

export type GetNoteItemQueryVariables = {
  id: string,
};

export type GetNoteItemQuery = {
  getNoteItem?:  {
    __typename: "NoteItem",
    id: string,
    title: string,
    description: string,
    startDateTime: string,
    recurringType: string,
    cognitoUser: string,
    expiryDate?: string | null,
    email?: string | null,
    password?: string | null,
    reminderDuration?: string | null,
    reminderType?:  Array< {
      __typename: "Contact",
      id?: string | null,
      type?: string | null,
      userId?: string | null,
      content?: string | null,
      verifyStatus?: string | null,
      createdDateTime?: string | null,
      updatedDateTime?: string | null,
      isActive?: boolean | null,
    } | null > | null,
  } | null,
};

export type GetNoteItemListQuery = {
  getNoteItemList?:  Array< {
    __typename: "NoteItem",
    id: string,
    title: string,
    description: string,
    startDateTime: string,
    recurringType: string,
    cognitoUser: string,
    expiryDate?: string | null,
    email?: string | null,
    password?: string | null,
    reminderDuration?: string | null,
    reminderType?:  Array< {
      __typename: "Contact",
      id?: string | null,
      type?: string | null,
      userId?: string | null,
      content?: string | null,
      verifyStatus?: string | null,
      createdDateTime?: string | null,
      updatedDateTime?: string | null,
      isActive?: boolean | null,
    } | null > | null,
  } | null > | null,
};

export type GetSocialAccountQueryVariables = {
  id: string,
};

export type GetSocialAccountQuery = {
  getSocialAccount?:  {
    __typename: "FbAccount",
    id?: string | null,
    userId?: string | null,
    longLiveToken?: string | null,
    igId?: string | null,
    pageAccessToken?: string | null,
    fbPageId?: string | null,
    llttokenExpiryDate?: string | null,
    name?: string | null,
    profilePictureUrl?: string | null,
  } | null,
};

export type GetSocialAccountListQuery = {
  getSocialAccountList?:  Array< {
    __typename: "FbAccount",
    id?: string | null,
    userId?: string | null,
    longLiveToken?: string | null,
    igId?: string | null,
    pageAccessToken?: string | null,
    fbPageId?: string | null,
    llttokenExpiryDate?: string | null,
    name?: string | null,
    profilePictureUrl?: string | null,
  } | null > | null,
};

export type GetFbPagesQueryVariables = {
  fbAccount: FbAccountInput,
};

export type GetFbPagesQuery = {
  getFbPages?:  Array< {
    __typename: "FbAccount",
    id?: string | null,
    userId?: string | null,
    longLiveToken?: string | null,
    igId?: string | null,
    pageAccessToken?: string | null,
    fbPageId?: string | null,
    llttokenExpiryDate?: string | null,
    name?: string | null,
    profilePictureUrl?: string | null,
  } | null > | null,
};

export type GetInstaAcctQueryVariables = {
  fbAccount: FbAccountInput,
};

export type GetInstaAcctQuery = {
  getInstaAcct?:  Array< {
    __typename: "FbAccount",
    id?: string | null,
    userId?: string | null,
    longLiveToken?: string | null,
    igId?: string | null,
    pageAccessToken?: string | null,
    fbPageId?: string | null,
    llttokenExpiryDate?: string | null,
    name?: string | null,
    profilePictureUrl?: string | null,
  } | null > | null,
};

export type GetFbWebhookQuery = {
  getFbWebhook?:  {
    __typename: "FbWebhook",
    id?: string | null,
    userId?: string | null,
    accessToken?: string | null,
    socialId?: string | null,
    accountType?: string | null,
    tokenExpiryDate?: string | null,
    name?: string | null,
    profilePictureUrl?: string | null,
  } | null,
};

export type GetKnowledgebaseByUserQuery = {
  getKnowledgebaseByUser?:  Array< {
    __typename: "Knowledgebase",
    id?: string | null,
    title?: string | null,
    description?: string | null,
    content?:  Array< {
      __typename: "KnowledgebaseContent",
      id?: string | null,
      contentName?: string | null,
      content?: string | null,
    } | null > | null,
    userId?: string | null,
    sourceType?: string | null,
    isActive?: boolean | null,
    createdDateTime?: string | null,
    updatedDateTime?: string | null,
  } | null > | null,
};

export type GetKnowledgebaseByIdQueryVariables = {
  id: string,
};

export type GetKnowledgebaseByIdQuery = {
  getKnowledgebaseById?:  {
    __typename: "Knowledgebase",
    id?: string | null,
    title?: string | null,
    description?: string | null,
    content?:  Array< {
      __typename: "KnowledgebaseContent",
      id?: string | null,
      contentName?: string | null,
      content?: string | null,
    } | null > | null,
    userId?: string | null,
    sourceType?: string | null,
    isActive?: boolean | null,
    createdDateTime?: string | null,
    updatedDateTime?: string | null,
  } | null,
};

export type GetChatbotByUserQuery = {
  getChatbotByUser?:  Array< {
    __typename: "Chatbot",
    id?: string | null,
    userId?: string | null,
    gptType?: string | null,
    title?: string | null,
    description?: string | null,
    socialAccounts?:  Array< {
      __typename: "FbAccount",
      id?: string | null,
      userId?: string | null,
      longLiveToken?: string | null,
      igId?: string | null,
      pageAccessToken?: string | null,
      fbPageId?: string | null,
      llttokenExpiryDate?: string | null,
      name?: string | null,
      profilePictureUrl?: string | null,
    } | null > | null,
    platformType?: string | null,
    knowledgebase?:  Array< {
      __typename: "Knowledgebase",
      id?: string | null,
      title?: string | null,
      description?: string | null,
      content?:  Array< {
        __typename: "KnowledgebaseContent",
        id?: string | null,
        contentName?: string | null,
        content?: string | null,
      } | null > | null,
      userId?: string | null,
      sourceType?: string | null,
      isActive?: boolean | null,
      createdDateTime?: string | null,
      updatedDateTime?: string | null,
    } | null > | null,
    createdDateTime?: string | null,
    updatedDateTime?: string | null,
  } | null > | null,
};

export type GetContactListQuery = {
  getContactList?:  Array< {
    __typename: "Contact",
    id?: string | null,
    type?: string | null,
    userId?: string | null,
    content?: string | null,
    verifyStatus?: string | null,
    createdDateTime?: string | null,
    updatedDateTime?: string | null,
    isActive?: boolean | null,
  } | null > | null,
};

export type GetImageUploadURLQueryVariables = {
  presignedUrlRequest?: PresignedUrlRequestInput | null,
};

export type GetImageUploadURLQuery = {
  getImageUploadURL?:  {
    __typename: "PresignedUrlResponse",
    uploadUrls?: Array< string | null > | null,
  } | null,
};
