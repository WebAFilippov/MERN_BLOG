export const formatDataToSend = (user) => {
  return {
    fullname: user.personal_info.fullname,
    username: user.personal_info.username,
    profile_img: user.personal_info.profile_img,
  }
}