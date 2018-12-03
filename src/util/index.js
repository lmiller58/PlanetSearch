export const determineViewRange = (ra, raSpread) => {
  //array index 0 should contain lower and higher Ra bound, dec should be in index 1
  let whereString = '';
  let minX;
  let maxX;
  //generate RA params

  if (ra + raSpread > 360 || ra - raSpread < 0) {
    if (ra + raSpread > 360) {
      whereString += `where=ra>${ra - raSpread} or ra<${ra + raSpread - 360}`;
      minX = ra - raSpread;
      maxX = ra + raSpread - 360;
    } else {
      whereString += `where=ra>${ra - raSpread + 360} or ra<${ra + raSpread}`;
      minX = ra - raSpread + 360;
      maxX = ra + raSpread;
    }
  } else {
    whereString += `where=ra>${ra - raSpread} and ra<${ra + raSpread}`;
    minX = ra - raSpread;
    maxX = ra + raSpread;
  }

  //generate dec params

  return { whereString, minX, maxX };
};

export const convertStarsToGrid = (stars, minX, maxX, minY, maxY) => {
  const starMap = {};

  stars.forEach(star => {
    let x = star.ra - minX;
    let y = star.dec - minY;
    x = x * 6;
    y = y * 6;
    starMap[star.mpl_hostname] = [x, y];
  });
  return starMap;
};
