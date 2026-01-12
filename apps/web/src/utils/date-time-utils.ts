import dayjs from "dayjs";
import { supportedTimeZones } from "@/utils/supported-time-zones";

export function getBrowserTimeZone() {
  const timeZone = dayjs.tz.guess();
  return normalizeTimeZone(timeZone);
}

function getTimeZoneOffset(timeZone: string) {
  try {
    return dayjs().tz(timeZone).utcOffset();
  } catch {
    console.log(`Failed to resolve timezone ${timeZone}`);
    return 0;
  }
}

function isFixedOffsetTimeZone(timeZone: string) {
  return (
    timeZone.toLowerCase().startsWith("etc") ||
    timeZone.toLowerCase().startsWith("gmt") ||
    timeZone.toLowerCase().startsWith("utc")
  );
}

/**
 * Given a timezone, this function returns a normalized timezone
 * that is supported by the application. If the timezone is not
 * recognized, it will return a timezone in the same continent
 * with the same offset.
 * @param timeZone
 * @returns
 */
export function normalizeTimeZone(timeZone: string) {
  let tz = supportedTimeZones.find((tz) => tz === timeZone);

  if (tz) {
    return tz;
  }

  const timeZoneOffset = getTimeZoneOffset(timeZone);

  if (!isFixedOffsetTimeZone(timeZone)) {
    // Find timezone in the same continent with the same offset
    const [continent] = timeZone.split("/");
    const sameContinentTimeZones = supportedTimeZones.filter((tz) =>
      tz.startsWith(continent)
    );
    tz = sameContinentTimeZones.find((tz) => {
      return dayjs().tz(tz, true).utcOffset() === timeZoneOffset;
    });
  }

  if (!tz) {
    tz = supportedTimeZones.find((tz) => {
      return getTimeZoneOffset(tz) === timeZoneOffset;
    });
  }

  if (!tz) {
    // In theory this shouldn't happen
    tz = "America/New_York";
    console.error(`Unable to resolve timezone ${timeZone}`);
  }

  return tz;
}
