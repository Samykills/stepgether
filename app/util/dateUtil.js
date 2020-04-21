/**
 * if post was made secs ago return X Secs.
 * if post was made minutes ago return X Mins.
 * if post was made hours ago return X Hrs.
 * if post was made yesterday ago return Yesterday, XX:XX.
 * else return 20/04/2020, 22:43:27
 * @param {FieldValue} date : Mon Apr 20 2020 23:09:33 GMT+0200 (Central European Summer Time)
 */
export const dateFormatPost = date => {
  try {
    const dateObj = date.toDate();
    const currentDateObj = new Date();
    const differenceDateObj = new Date(
      currentDateObj.getTime() - dateObj.getTime(),
    );
    const differenceDays = differenceDateObj.getDate();
    const differenceHour = differenceDateObj.getHours();
    const differenceMinutes = differenceDateObj.getMinutes();
    const differenceSeconds = differenceDateObj.getSeconds();
    if (differenceDays === 1) {
      if (differenceHour < 2) {
        if (differenceMinutes < 2) {
          return differenceSeconds + ' seconds ago';
        } else {
          return differenceMinutes + ' minutes ago';
        }
      } else {
        return differenceHour + ' hours ago';
      }
    } else if (differenceMinutes === 2) {
      return `Yesterday, ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    } else {
      return dateObj.toLocalString();
    }
  } catch (e) {
    console.log('====================================');
    console.log(e);
    console.log('====================================');
    // return null;
  }
};
