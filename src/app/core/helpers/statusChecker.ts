export function statusChecker(
  prevText: string,
  currentText: string,
  prevStatus: number,
  isTaskDone: boolean,
): number {
  let status = prevStatus;

  if (prevText !== currentText) {
    if (prevStatus === 0) {
      status = 1;
    } else if (prevStatus === 10) {
      status = 11;
    }
  } else {
    if (isTaskDone) {
      status = prevStatus === 1 || prevStatus === 11 ? 11 : 10;
    } else {
      status = prevStatus === 1 || prevStatus === 11 ? 1 : 0;
    }
  }
  return status;
}
