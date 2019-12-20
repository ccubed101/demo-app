export class AppStatePersistenceService {

    // Keys for key/value pairs.
    public static LeftPanelWidth: string = "LeftPanelWidth";
    public static CenterPanelWidth: string = "CenterPanelWidth";
    public static RightPanelWidth: string = "RightPanelWidth";

    public static SaveSiteSid: string = "SaveSiteSid";
    public static ReportGuid: string = "ReportGuid";

    // Constants.

    // Cookie expiration.
    private static expires: Date = new Date(new Date().getTime() + (10 *365 * 24 * 60 * 60 * 1000));    // 10 years.


    // Public methods.

    public static Persist(key: string, value: string) {
        //var d = new Date();
        //var days = 30;
        //d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));

        let cookie: string = key + '=' + value + ';expires=' + AppStatePersistenceService.expires.toUTCString() + ';path=/';
        document.cookie = cookie;
    }

    public static Retrieve(key: string) {
        let value: string = null;

        let keyValuePairs: Array<string> = document.cookie.split(';');
        let keyValuePair: string = keyValuePairs.find((pair: string) => {
            if (pair.trim().startsWith(key))
                return true;
            else
                return false;
        });
        if (keyValuePair != null) {
            let keyAndValue: Array<string> = keyValuePair.split('=');
            value = keyAndValue[1];
        }

        return value;
    }
}
