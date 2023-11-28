/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCognitoUser = /* GraphQL */ `
  query GetCognitoUser {
    getCognitoUser {
      id
      username
      email
    }
  }
`;
export const getNoteItem = /* GraphQL */ `
  query GetNoteItem($id: String!) {
    getNoteItem(id: $id) {
      id
      title
      description
      startDateTime
      recurringType
      cognitoUser
      expiryDate
      email
      password
      reminderDuration
      reminderType {
        id
        type
        userId
        content
        verifyStatus
        createdDateTime
        updatedDateTime
        isActive
      }
    }
  }
`;
export const getNoteItemList = /* GraphQL */ `
  query GetNoteItemList {
    getNoteItemList {
      id
      title
      description
      startDateTime
      recurringType
      cognitoUser
      expiryDate
      email
      password
      reminderDuration
      reminderType {
        id
        type
        userId
        content
        verifyStatus
        createdDateTime
        updatedDateTime
        isActive
      }
    }
  }
`;
export const getSocialAccount = /* GraphQL */ `
  query GetSocialAccount($id: String!) {
    getSocialAccount(id: $id) {
      id
      userId
      longLiveToken
      igId
      pageAccessToken
      fbPageId
      llttokenExpiryDate
      name
      profilePictureUrl
    }
  }
`;
export const getSocialAccountList = /* GraphQL */ `
  query GetSocialAccountList {
    getSocialAccountList {
      id
      userId
      longLiveToken
      igId
      pageAccessToken
      fbPageId
      llttokenExpiryDate
      name
      profilePictureUrl
    }
  }
`;
export const getFbPages = /* GraphQL */ `
  query GetFbPages($fbAccount: FbAccountInput!) {
    getFbPages(fbAccount: $fbAccount) {
      id
      userId
      longLiveToken
      igId
      pageAccessToken
      fbPageId
      llttokenExpiryDate
      name
      profilePictureUrl
    }
  }
`;
export const getInstaAcct = /* GraphQL */ `
  query GetInstaAcct($fbAccount: FbAccountInput!) {
    getInstaAcct(fbAccount: $fbAccount) {
      id
      userId
      longLiveToken
      igId
      pageAccessToken
      fbPageId
      llttokenExpiryDate
      name
      profilePictureUrl
    }
  }
`;
export const getFbWebhook = /* GraphQL */ `
  query GetFbWebhook {
    getFbWebhook {
      id
      userId
      accessToken
      socialId
      accountType
      tokenExpiryDate
      name
      profilePictureUrl
    }
  }
`;
export const getKnowledgebaseByUser = /* GraphQL */ `
  query GetKnowledgebaseByUser {
    getKnowledgebaseByUser {
      id
      title
      description
      content {
        id
        contentName
        content
      }
      userId
      sourceType
      isActive
      createdDateTime
      updatedDateTime
    }
  }
`;
export const getKnowledgebaseById = /* GraphQL */ `
  query GetKnowledgebaseById($id: String!) {
    getKnowledgebaseById(id: $id) {
      id
      title
      description
      content {
        id
        contentName
        content
      }
      userId
      sourceType
      isActive
      createdDateTime
      updatedDateTime
    }
  }
`;
export const getChatbotByUser = /* GraphQL */ `
  query GetChatbotByUser {
    getChatbotByUser {
      id
      userId
      gptType
      title
      description
      socialAccounts {
        id
        userId
        longLiveToken
        igId
        pageAccessToken
        fbPageId
        llttokenExpiryDate
        name
        profilePictureUrl
      }
      platformType
      knowledgebase {
        id
        title
        description
        content {
          id
          contentName
          content
        }
        userId
        sourceType
        isActive
        createdDateTime
        updatedDateTime
      }
      createdDateTime
      updatedDateTime
    }
  }
`;
export const getContactList = /* GraphQL */ `
  query GetContactList {
    getContactList {
      id
      type
      userId
      content
      verifyStatus
      createdDateTime
      updatedDateTime
      isActive
    }
  }
`;
export const getImageUploadURL = /* GraphQL */ `
  query GetImageUploadURL($presignedUrlRequest: PresignedUrlRequestInput) {
    getImageUploadURL(presignedUrlRequest: $presignedUrlRequest) {
      uploadUrls
    }
  }
`;
