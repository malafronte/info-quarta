---
title: "Esempi di servizi REST"
description: "Esempi di servizi REST"
sidebar:
  label: "Esempi di servizi REST"
  order: 50

---
<style>
img {display: block; margin: 0 auto;}
</style>

## Open-Meteo API

<https://open-meteo.com/>

Open-Meteo è un servizio meteorologico accessibile tramite API REST. Nello scenario d'uso più comune non richiede chiavi di autenticazione, rendendolo adatto a esercitazioni e prototipi. Dalla documentazione ufficiale si ricavano anche vincoli e condizioni d'uso, che devono essere rispettati.

<https://open-meteo.com/en/pricing/>

:::note
In base alle indicazioni riportate nella pagina di pricing (da considerarsi fonte primaria e soggetta ad aggiornamenti), le API di Open-Meteo risultano gratuite per uso non commerciale; viene inoltre richiesto un utilizzo corretto (*fair use*) e l'attribuzione. È raccomandato mantenere le richieste giornaliere al di sotto di 10.000; il provider si riserva la facoltà di bloccare applicazioni o indirizzi IP che abusino del servizio. Per i dettagli si rimanda alle condizioni d'uso: <https://open-meteo.com/en/terms>.
:::

> **Open-Meteo APIs are free for non-commercial use**. We do not restrict access, but ask for fair use and attribution.
>
> Kindly ensure that your daily requests remain below 10,000. Please note that we retain the right to block applications and IP addresses that misuse our service. For additional information, please refer to the [terms and conditions](https://open-meteo.com/en/terms).

### URL encoding

Negli esempi seguenti verranno scritte URL contenenti stringhe di testo. È importante osservare che, affinché le URL siano valide, devono contenere solo caratteri ASCII e non devono contenere spazi. Nel caso in cui in una stringa siano presenti spazi oppure caratteri non esprimibili con l'ASCII standard, si dovrà ricorrere ad un URL Encoding, come previsto dalle tabelle riportate qui:

[https://www.w3schools.com/tags/ref_urlencode.asp](https://www.w3schools.com/tags/ref_urlencode.asp)

In C# esiste il metodo `HttpUtility.UrlEncode()` per effettuare l'URL encoding di una stringa

### Utilizzo del servizio

Per utilizzare le API di Open-Meteo è consigliabile passare attraverso la pagina di configurazione dell'URL:

<https://open-meteo.com/en/docs>

Da questa pagina si possono selezionare i parametri che si vogliono ottenere e, dopo aver selezionato il luogo e aver cliccato sul pulsante "Detect GPS Position", si ottiene un URL che può essere utilizzato per effettuare una richiesta HTTP GET e ricevere i dati in formato JSON:

Il *timezone* deve essere configurato correttamente, altrimenti la richiesta GET potrebbe non funzionare. È possibile utilizzare tutti i fusi orari disponibili (si veda: [https://en.wikipedia.org/wiki/List_of_tz_database_time_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)). Ad esempio, per l'Italia il *timezone* è `Europe/Rome`.

### Il data model

Il modello è stato ottenuto a partire dal JSON della risposta con il procedimento consueto (ad esempio "Paste JSON as Classes" di Visual Studio, oppure il tool <https://json2csharp.com/> con le impostazioni "Use Pascal Case" e "Use JsonPropertyName (.NET Core)") e successivi aggiustamenti sui tipi. In particolare, i tipi `int` e `double` sono stati trasformati rispettivamente in `int?` e `double?`, e tutti i tipi reference sono stati convertiti nella versione nullable. In questo modo, se per un parametro non viene restituito alcun valore, la deserializzazione produce `null` sia per i reference type sia per i value type nullable: l'applicazione client può quindi distinguere il caso in cui un parametro non è stato restituito dal caso in cui esso assume un valore di default (ad esempio 0 per i tipi numerici).

#### Modello completo

Di seguito si riporta il model relativo ad una richiesta che contiene praticamente tutti i parametri

L'URL di richiesta è:

https://api.open-meteo.com/v1/forecast?latitude=45.65&longitude=9.2055&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=Europe%2FRome

Nell'esempio seguente la definizione del Model è ottenuta utilizzando <https://json2csharp.com/> con le impostazioni "Use Pascal Case" e "Use JsonPropertyName (.NET Core)" e rinominando la classe Root in OpenMeteoForecastComplete. Il risultato della chiamata all'URL di richiesta è incollato nell'editor online nella parte JSON. Il model C# ottenuto è stato poi modificato in Visual Studio, rinominando la classe Root in OpenMeteoForecast e modificando i tipi reference in nullable aggiungendo il simbolo "?". Inoltre, anche per i tipi double e int si è optato per la versione nullable.

È importante osservare che, in alcuni casi, la conversione automatica da JSON a C# può produrre una modellazione non corretta: un campo può apparire come intero in un esempio, ma essere in realtà un valore in virgola mobile. Ad esempio, il campo `elevation` può assumere un valore intero (e quindi essere convertito in `int`) per alcune località; tuttavia, dalla documentazione si evince che esso può essere un `double`. In tal caso, una deserializzazione eseguita con un tipo non compatibile può portare l'applicazione in eccezione per località in cui `elevation` non è intero.

Si supponga di creare un'applicazione .NET (Console) chiamata OpenMeteoAPIClient e di aggiungere al progetto una cartella Models: all'interno di tale cartella si crea la sottocartella Complete e, al suo interno, la classe OpenMeteoForecast:

```csharp
//file OpenMeteoForecast.cs
using System.Text.Json.Serialization;
namespace OpenMeteoAPIClient.Models.Complete
{
    // OpenMeteoForecast myDeserializedClass = JsonSerializer.Deserialize<OpenMeteoForecast>(myJsonResponse);
    public class Current
    {
        [JsonPropertyName("time")]
        public int? Time { get; set; }
        [JsonPropertyName("interval")]
        public int? Interval { get; set; }
        [JsonPropertyName("temperature_2m")]
        public double? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public int? RelativeHumidity2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public double? ApparentTemperature { get; set; }
        [JsonPropertyName("is_day")]
        public int? IsDay { get; set; }
        [JsonPropertyName("precipitation")]
        public int? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public int? Rain { get; set; }
        [JsonPropertyName("showers")]
        public int? Showers { get; set; }
        [JsonPropertyName("snowfall")]
        public int? Snowfall { get; set; }
        [JsonPropertyName("weather_code")]
        public int? WeatherCode { get; set; }
        [JsonPropertyName("cloud_cover")]
        public int? CloudCover { get; set; }
        [JsonPropertyName("pressure_msl")]
        public double? PressureMsl { get; set; }
        [JsonPropertyName("surface_pressure")]
        public double? SurfacePressure { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public double? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public int? WindDirection10m { get; set; }
        [JsonPropertyName("wind_gusts_10m")]
        public double? WindGusts10m { get; set; }
    }
    public class CurrentUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("interval")]
        public string? Interval { get; set; }
        [JsonPropertyName("temperature_2m")]
        public string? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public string? RelativeHumidity2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public string? ApparentTemperature { get; set; }
        [JsonPropertyName("is_day")]
        public string? IsDay { get; set; }
        [JsonPropertyName("precipitation")]
        public string? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public string? Rain { get; set; }
        [JsonPropertyName("showers")]
        public string? Showers { get; set; }
        [JsonPropertyName("snowfall")]
        public string? Snowfall { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("cloud_cover")]
        public string? CloudCover { get; set; }
        [JsonPropertyName("pressure_msl")]
        public string? PressureMsl { get; set; }
        [JsonPropertyName("surface_pressure")]
        public string? SurfacePressure { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public string? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public string? WindDirection10m { get; set; }
        [JsonPropertyName("wind_gusts_10m")]
        public string? WindGusts10m { get; set; }
    }
    public class Daily
    {
        [JsonPropertyName("time")]
        public List<int>? Time { get; set; }
        [JsonPropertyName("weather_code")]
        public List<int>? WeatherCode { get; set; }
        [JsonPropertyName("temperature_2m_max")]
        public List<double>? Temperature2mMax { get; set; }
        [JsonPropertyName("temperature_2m_min")]
        public List<double>? Temperature2mMin { get; set; }
        [JsonPropertyName("apparent_temperature_max")]
        public List<double>? ApparentTemperatureMax { get; set; }
        [JsonPropertyName("apparent_temperature_min")]
        public List<double>? ApparentTemperatureMin { get; set; }
        [JsonPropertyName("sunrise")]
        public List<int>? Sunrise { get; set; }
        [JsonPropertyName("sunset")]
        public List<int>? Sunset { get; set; }
        [JsonPropertyName("daylight_duration")]
        public List<double>? DaylightDuration { get; set; }
        [JsonPropertyName("sunshine_duration")]
        public List<double>? SunshineDuration { get; set; }
        [JsonPropertyName("uv_index_max")]
        public List<double>? UvIndexMax { get; set; }
        [JsonPropertyName("uv_index_clear_sky_max")]
        public List<double>? UvIndexClearSkyMax { get; set; }
        [JsonPropertyName("precipitation_sum")]
        public List<double>? PrecipitationSum { get; set; }
        [JsonPropertyName("rain_sum")]
        public List<double>? RainSum { get; set; }
        [JsonPropertyName("showers_sum")]
        public List<double>? ShowersSum { get; set; }
        [JsonPropertyName("snowfall_sum")]
        public List<int>? SnowfallSum { get; set; }
        [JsonPropertyName("precipitation_hours")]
        public List<int>? PrecipitationHours { get; set; }
        [JsonPropertyName("precipitation_probability_max")]
        public List<int>? PrecipitationProbabilityMax { get; set; }
        [JsonPropertyName("wind_speed_10m_max")]
        public List<double>? WindSpeed10mMax { get; set; }
        [JsonPropertyName("wind_gusts_10m_max")]
        public List<double>? WindGusts10mMax { get; set; }
        [JsonPropertyName("wind_direction_10m_dominant")]
        public List<int>? WindDirection10mDominant { get; set; }
        [JsonPropertyName("shortwave_radiation_sum")]
        public List<double>? ShortwaveRadiationSum { get; set; }
        [JsonPropertyName("et0_fao_evapotranspiration")]
        public List<double>? Et0FaoEvapotranspiration { get; set; }
    }
    public class DailyUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("temperature_2m_max")]
        public string? Temperature2mMax { get; set; }
        [JsonPropertyName("temperature_2m_min")]
        public string? Temperature2mMin { get; set; }
        [JsonPropertyName("apparent_temperature_max")]
        public string? ApparentTemperatureMax { get; set; }
        [JsonPropertyName("apparent_temperature_min")]
        public string? ApparentTemperatureMin { get; set; }
        [JsonPropertyName("sunrise")]
        public string? Sunrise { get; set; }
        [JsonPropertyName("sunset")]
        public string? Sunset { get; set; }
        [JsonPropertyName("daylight_duration")]
        public string? DaylightDuration { get; set; }
        [JsonPropertyName("sunshine_duration")]
        public string? SunshineDuration { get; set; }
        [JsonPropertyName("uv_index_max")]
        public string? UvIndexMax { get; set; }
        [JsonPropertyName("uv_index_clear_sky_max")]
        public string? UvIndexClearSkyMax { get; set; }
        [JsonPropertyName("precipitation_sum")]
        public string? PrecipitationSum { get; set; }
        [JsonPropertyName("rain_sum")]
        public string? RainSum { get; set; }
        [JsonPropertyName("showers_sum")]
        public string? ShowersSum { get; set; }
        [JsonPropertyName("snowfall_sum")]
        public string? SnowfallSum { get; set; }
        [JsonPropertyName("precipitation_hours")]
        public string? PrecipitationHours { get; set; }
        [JsonPropertyName("precipitation_probability_max")]
        public string? PrecipitationProbabilityMax { get; set; }
        [JsonPropertyName("wind_speed_10m_max")]
        public string? WindSpeed10mMax { get; set; }
        [JsonPropertyName("wind_gusts_10m_max")]
        public string? WindGusts10mMax { get; set; }
        [JsonPropertyName("wind_direction_10m_dominant")]
        public string? WindDirection10mDominant { get; set; }
        [JsonPropertyName("shortwave_radiation_sum")]
        public string? ShortwaveRadiationSum { get; set; }
        [JsonPropertyName("et0_fao_evapotranspiration")]
        public string? Et0FaoEvapotranspiration { get; set; }
    }
    public class Hourly
    {
        [JsonPropertyName("time")]
        public List<int>? Time { get; set; }
        [JsonPropertyName("temperature_2m")]
        public List<double>? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public List<int>? RelativeHumidity2m { get; set; }
        [JsonPropertyName("dew_point_2m")]
        public List<double>? DewPoint2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public List<double>? ApparentTemperature { get; set; }
        [JsonPropertyName("precipitation_probability")]
        public List<int>? PrecipitationProbability { get; set; }
        [JsonPropertyName("precipitation")]
        public List<double>? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public List<double>? Rain { get; set; }
        [JsonPropertyName("showers")]
        public List<double>? Showers { get; set; }
        [JsonPropertyName("snowfall")]
        public List<int>? Snowfall { get; set; }
        [JsonPropertyName("snow_depth")]
        public List<int>? SnowDepth { get; set; }
        [JsonPropertyName("weather_code")]
        public List<int>? WeatherCode { get; set; }
        [JsonPropertyName("pressure_msl")]
        public List<double>? PressureMsl { get; set; }
        [JsonPropertyName("surface_pressure")]
        public List<double>? SurfacePressure { get; set; }
        [JsonPropertyName("cloud_cover")]
        public List<int>? CloudCover { get; set; }
        [JsonPropertyName("cloud_cover_low")]
        public List<int>? CloudCoverLow { get; set; }
        [JsonPropertyName("cloud_cover_mid")]
        public List<int>? CloudCoverMid { get; set; }
        [JsonPropertyName("cloud_cover_high")]
        public List<int>? CloudCoverHigh { get; set; }
        [JsonPropertyName("visibility")]
        public List<int>? Visibility { get; set; }
        [JsonPropertyName("evapotranspiration")]
        public List<double>? Evapotranspiration { get; set; }
        [JsonPropertyName("et0_fao_evapotranspiration")]
        public List<double>? Et0FaoEvapotranspiration { get; set; }
        [JsonPropertyName("vapour_pressure_deficit")]
        public List<double>? VapourPressureDeficit { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public List<double>? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_speed_80m")]
        public List<double>? WindSpeed80m { get; set; }
        [JsonPropertyName("wind_speed_120m")]
        public List<double>? WindSpeed120m { get; set; }
        [JsonPropertyName("wind_speed_180m")]
        public List<double>? WindSpeed180m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public List<int>? WindDirection10m { get; set; }
        [JsonPropertyName("wind_direction_80m")]
        public List<int>? WindDirection80m { get; set; }
        [JsonPropertyName("wind_direction_120m")]
        public List<int>? WindDirection120m { get; set; }
        [JsonPropertyName("wind_direction_180m")]
        public List<int>? WindDirection180m { get; set; }
        [JsonPropertyName("wind_gusts_10m")]
        public List<double>? WindGusts10m { get; set; }
        [JsonPropertyName("temperature_80m")]
        public List<double>? Temperature80m { get; set; }
        [JsonPropertyName("temperature_120m")]
        public List<double>? Temperature120m { get; set; }
        [JsonPropertyName("temperature_180m")]
        public List<double>? Temperature180m { get; set; }
        [JsonPropertyName("soil_temperature_0cm")]
        public List<double>? SoilTemperature0cm { get; set; }
        [JsonPropertyName("soil_temperature_6cm")]
        public List<double>? SoilTemperature6cm { get; set; }
        [JsonPropertyName("soil_temperature_18cm")]
        public List<double>? SoilTemperature18cm { get; set; }
        [JsonPropertyName("soil_temperature_54cm")]
        public List<double>? SoilTemperature54cm { get; set; }
        [JsonPropertyName("soil_moisture_0_to_1cm")]
        public List<double>? SoilMoisture0To1cm { get; set; }
        [JsonPropertyName("soil_moisture_1_to_3cm")]
        public List<double>? SoilMoisture1To3cm { get; set; }
        [JsonPropertyName("soil_moisture_3_to_9cm")]
        public List<double>? SoilMoisture3To9cm { get; set; }
        [JsonPropertyName("soil_moisture_9_to_27cm")]
        public List<double>? SoilMoisture9To27cm { get; set; }
        [JsonPropertyName("soil_moisture_27_to_81cm")]
        public List<double>? SoilMoisture27To81cm { get; set; }
    }
    public class HourlyUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("temperature_2m")]
        public string? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public string? RelativeHumidity2m { get; set; }
        [JsonPropertyName("dew_point_2m")]
        public string? DewPoint2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public string? ApparentTemperature { get; set; }
        [JsonPropertyName("precipitation_probability")]
        public string? PrecipitationProbability { get; set; }
        [JsonPropertyName("precipitation")]
        public string? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public string? Rain { get; set; }
        [JsonPropertyName("showers")]
        public string? Showers { get; set; }
        [JsonPropertyName("snowfall")]
        public string? Snowfall { get; set; }
        [JsonPropertyName("snow_depth")]
        public string? SnowDepth { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("pressure_msl")]
        public string? PressureMsl { get; set; }
        [JsonPropertyName("surface_pressure")]
        public string? SurfacePressure { get; set; }
        [JsonPropertyName("cloud_cover")]
        public string? CloudCover { get; set; }
        [JsonPropertyName("cloud_cover_low")]
        public string? CloudCoverLow { get; set; }
        [JsonPropertyName("cloud_cover_mid")]
        public string? CloudCoverMid { get; set; }
        [JsonPropertyName("cloud_cover_high")]
        public string? CloudCoverHigh { get; set; }
        [JsonPropertyName("visibility")]
        public string? Visibility { get; set; }
        [JsonPropertyName("evapotranspiration")]
        public string? Evapotranspiration { get; set; }
        [JsonPropertyName("et0_fao_evapotranspiration")]
        public string? Et0FaoEvapotranspiration { get; set; }
        [JsonPropertyName("vapour_pressure_deficit")]
        public string? VapourPressureDeficit { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public string? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_speed_80m")]
        public string? WindSpeed80m { get; set; }
        [JsonPropertyName("wind_speed_120m")]
        public string? WindSpeed120m { get; set; }
        [JsonPropertyName("wind_speed_180m")]
        public string? WindSpeed180m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public string? WindDirection10m { get; set; }
        [JsonPropertyName("wind_direction_80m")]
        public string? WindDirection80m { get; set; }
        [JsonPropertyName("wind_direction_120m")]
        public string? WindDirection120m { get; set; }
        [JsonPropertyName("wind_direction_180m")]
        public string? WindDirection180m { get; set; }
        [JsonPropertyName("wind_gusts_10m")]
        public string? WindGusts10m { get; set; }
        [JsonPropertyName("temperature_80m")]
        public string? Temperature80m { get; set; }
        [JsonPropertyName("temperature_120m")]
        public string? Temperature120m { get; set; }
        [JsonPropertyName("temperature_180m")]
        public string? Temperature180m { get; set; }
        [JsonPropertyName("soil_temperature_0cm")]
        public string? SoilTemperature0cm { get; set; }
        [JsonPropertyName("soil_temperature_6cm")]
        public string? SoilTemperature6cm { get; set; }
        [JsonPropertyName("soil_temperature_18cm")]
        public string? SoilTemperature18cm { get; set; }
        [JsonPropertyName("soil_temperature_54cm")]
        public string? SoilTemperature54cm { get; set; }
        [JsonPropertyName("soil_moisture_0_to_1cm")]
        public string? SoilMoisture0To1cm { get; set; }
        [JsonPropertyName("soil_moisture_1_to_3cm")]
        public string? SoilMoisture1To3cm { get; set; }
        [JsonPropertyName("soil_moisture_3_to_9cm")]
        public string? SoilMoisture3To9cm { get; set; }
        [JsonPropertyName("soil_moisture_9_to_27cm")]
        public string? SoilMoisture9To27cm { get; set; }
        [JsonPropertyName("soil_moisture_27_to_81cm")]
        public string? SoilMoisture27To81cm { get; set; }
    }
    public class OpenMeteoForecast
    {
        [JsonPropertyName("latitude")]
        public double? Latitude { get; set; }
        [JsonPropertyName("longitude")]
        public double? Longitude { get; set; }
        [JsonPropertyName("generationtime_ms")]
        public double? GenerationtimeMs { get; set; }
        [JsonPropertyName("utc_offset_seconds")]
        public int? UtcOffsetSeconds { get; set; }
        [JsonPropertyName("timezone")]
        public string? Timezone { get; set; }
        [JsonPropertyName("timezone_abbreviation")]
        public string? TimezoneAbbreviation { get; set; }
        [JsonPropertyName("elevation")]
        public double? Elevation { get; set; }
        [JsonPropertyName("current_units")]
        public CurrentUnits? CurrentUnits { get; set; }
        [JsonPropertyName("current")]
        public Current? Current { get; set; }
        [JsonPropertyName("hourly_units")]
        public HourlyUnits? HourlyUnits { get; set; }
        [JsonPropertyName("hourly")]
        public Hourly? Hourly { get; set; }
        [JsonPropertyName("daily_units")]
        public DailyUnits? DailyUnits { get; set; }
        [JsonPropertyName("daily")]
        public Daily? Daily { get; set; }
    }
}
```
#### Modello minimale

Di seguito si riporta il model relativo a una richiesta che include solo un sottoinsieme di parametri. Il procedimento è analogo a quanto visto nel caso del modello completo.

L'URL di richiesta è:

https://api.open-meteo.com/v1/forecast?latitude=45.7095&longitude=9.3156&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timeformat=unixtime&timezone=auto

All'interno della cartella Models si crea la cartella Minimal e, al suo interno, la classe OpenMeteoForecast:

```csharp
//file OpenMeteoForecast.cs
 using System.Text.Json.Serialization;
namespace OpenMeteoAPIClient.Models.Minimal
{
    // OpenMeteoForecast myDeserializedClass = JsonSerializer.Deserialize<OpenMeteoForecast>(myJsonResponse);
    public class Current
    {
        [JsonPropertyName("time")]
        public int? Time { get; set; }
        [JsonPropertyName("interval")]
        public int? Interval { get; set; }
        [JsonPropertyName("temperature_2m")]
        public double? Temperature2m { get; set; }
        [JsonPropertyName("weather_code")]
        public int? WeatherCode { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public double? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public int? WindDirection10m { get; set; }
    }
    public class CurrentUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("interval")]
        public string? Interval { get; set; }
        [JsonPropertyName("temperature_2m")]
        public string? Temperature2m { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public string? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public string? WindDirection10m { get; set; }
    }
    public class Daily
    {
        [JsonPropertyName("time")]
        public List<int>? Time { get; set; }
        [JsonPropertyName("weather_code")]
        public List<int>? WeatherCode { get; set; }
        [JsonPropertyName("temperature_2m_max")]
        public List<double>? Temperature2mMax { get; set; }
        [JsonPropertyName("temperature_2m_min")]
        public List<double>? Temperature2mMin { get; set; }
        [JsonPropertyName("apparent_temperature_max")]
        public List<double>? ApparentTemperatureMax { get; set; }
        [JsonPropertyName("apparent_temperature_min")]
        public List<double>? ApparentTemperatureMin { get; set; }
    }
    public class DailyUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("temperature_2m_max")]
        public string? Temperature2mMax { get; set; }
        [JsonPropertyName("temperature_2m_min")]
        public string? Temperature2mMin { get; set; }
        [JsonPropertyName("apparent_temperature_max")]
        public string? ApparentTemperatureMax { get; set; }
        [JsonPropertyName("apparent_temperature_min")]
        public string? ApparentTemperatureMin { get; set; }
    }
    public class Hourly
    {
        [JsonPropertyName("time")]
        public List<int>? Time { get; set; }
        [JsonPropertyName("temperature_2m")]
        public List<double>? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public List<int>? RelativeHumidity2m { get; set; }
        [JsonPropertyName("dew_point_2m")]
        public List<double>? DewPoint2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public List<double>? ApparentTemperature { get; set; }
        [JsonPropertyName("precipitation_probability")]
        public List<int>? PrecipitationProbability { get; set; }
        [JsonPropertyName("precipitation")]
        public List<double>? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public List<double>? Rain { get; set; }
        [JsonPropertyName("showers")]
        public List<double>? Showers { get; set; }
        [JsonPropertyName("weather_code")]
        public List<int>? WeatherCode { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public List<double>? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public List<int>? WindDirection10m { get; set; }
    }
    public class HourlyUnits
    {
        [JsonPropertyName("time")]
        public string? Time { get; set; }
        [JsonPropertyName("temperature_2m")]
        public string? Temperature2m { get; set; }
        [JsonPropertyName("relative_humidity_2m")]
        public string? RelativeHumidity2m { get; set; }
        [JsonPropertyName("dew_point_2m")]
        public string? DewPoint2m { get; set; }
        [JsonPropertyName("apparent_temperature")]
        public string? ApparentTemperature { get; set; }
        [JsonPropertyName("precipitation_probability")]
        public string? PrecipitationProbability { get; set; }
        [JsonPropertyName("precipitation")]
        public string? Precipitation { get; set; }
        [JsonPropertyName("rain")]
        public string? Rain { get; set; }
        [JsonPropertyName("showers")]
        public string? Showers { get; set; }
        [JsonPropertyName("weather_code")]
        public string? WeatherCode { get; set; }
        [JsonPropertyName("wind_speed_10m")]
        public string? WindSpeed10m { get; set; }
        [JsonPropertyName("wind_direction_10m")]
        public string? WindDirection10m { get; set; }
    }
    public class OpenMeteoForecast
    {
        [JsonPropertyName("latitude")]
        public double? Latitude { get; set; }
        [JsonPropertyName("longitude")]
        public double? Longitude { get; set; }
        [JsonPropertyName("generationtime_ms")]
        public double? GenerationtimeMs { get; set; }
        [JsonPropertyName("utc_offset_seconds")]
        public int? UtcOffsetSeconds { get; set; }
        [JsonPropertyName("timezone")]
        public string? Timezone { get; set; }
        [JsonPropertyName("timezone_abbreviation")]
        public string? TimezoneAbbreviation { get; set; }
        [JsonPropertyName("elevation")]
        public double? Elevation { get; set; }
        [JsonPropertyName("current_units")]
        public CurrentUnits? CurrentUnits { get; set; }
        [JsonPropertyName("current")]
        public Current? Current { get; set; }
        [JsonPropertyName("hourly_units")]
        public HourlyUnits? HourlyUnits { get; set; }
        [JsonPropertyName("hourly")]
        public Hourly? Hourly { get; set; }
        [JsonPropertyName("daily_units")]
        public DailyUnits? DailyUnits { get; set; }
        [JsonPropertyName("daily")]
        public Daily? Daily { get; set; }
    }
}
```
### Il servizio di geocoding

Per poter effettuare una richiesta di previsioni meteo riferita ad una località, occorre conoscere le coordinate GPS di quella località. Per conoscere le coordinate GPS di una località è possibile utilizzare il servizio di geocoding di Open-Meteo che non richiede nessuna chiave:

<https://open-meteo.com/en/docs/geocoding-api>

Il servizio di Geocoding serve per ottenere le coordinate GPS di una località. Infatti, per poter ottenere le previsioni meteo di una località occorre, prima di tutto conoscere le coordinate GPS di quella località. Il Data Model per de-serializzare i dati provenienti dalle API di Geocoding è riportato di seguito. Il procedimento è analogo a quello ottenuto per il data model delle previsioni meteo. Si noti che, dato il nome di una località è possibile avere più risultati. Ad esempio, facendo la ricerca con il nome Berlin si ottengono diversi risultati. È possibile limitare il numero di risultati con il parametro count, si veda la documentazione di Open-Meteo a riguardo. I risultati vengono restituiti in ordine di rilevanza decrescente:

```csharp
//file: OpenMeteoGeocodingResults.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
namespace OpenMeteoAPIClient.Models
{
    // OpenMeteoGeocoding myDeserializedClass = JsonSerializer.Deserialize<OpenMeteoGeocoding>(myJsonResponse);
    public class Result
    {
        [JsonPropertyName("id")]
        public int? Id { get; set; }
        [JsonPropertyName("name")]
        public string? Name { get; set; }
        [JsonPropertyName("latitude")]
        public double? Latitude { get; set; }
        [JsonPropertyName("longitude")]
        public double? Longitude { get; set; }
        [JsonPropertyName("elevation")]
        public double? Elevation { get; set; }
        [JsonPropertyName("feature_code")]
        public string? FeatureCode { get; set; }
        [JsonPropertyName("country_code")]
        public string? CountryCode { get; set; }
        [JsonPropertyName("admin1_id")]
        public int? Admin1Id { get; set; }
        [JsonPropertyName("admin3_id")]
        public int? Admin3Id { get; set; }
        [JsonPropertyName("admin4_id")]
        public int? Admin4Id { get; set; }
        [JsonPropertyName("timezone")]
        public string? Timezone { get; set; }
        [JsonPropertyName("population")]
        public int? Population { get; set; }
        [JsonPropertyName("postcodes")]
        public List<string>? Postcodes { get; set; }
        [JsonPropertyName("country_id")]
        public int? CountryId { get; set; }
        [JsonPropertyName("country")]
        public string? Country { get; set; }
        [JsonPropertyName("admin1")]
        public string? Admin1 { get; set; }
        [JsonPropertyName("admin3")]
        public string? Admin3 { get; set; }
        [JsonPropertyName("admin4")]
        public string? Admin4 { get; set; }
        [JsonPropertyName("admin2_id")]
        public int? Admin2Id { get; set; }
        [JsonPropertyName("admin2")]
        public string? Admin2 { get; set; }
    }
    public class OpenMeteoGeocoding
    {
        [JsonPropertyName("results")]
        public List<Result>? Results { get; set; }
        [JsonPropertyName("generationtime_ms")]
        public double? GenerationtimeMs { get; set; }
    }
}
```
### La classe Utils (metodi di utilità)

```csharp
//file Utils.cs
using OpenMeteoAPIClient.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Web;
namespace OpenMeteoAPIClient
{
    public static class Utils
    {
        /// <summary>
        /// Stampa value se questo non è nullo. Nel caso in cui value sia nullo stampa stringIfNull. Se stringIfNull è null viene usata string.Empty
        /// </summary>
        /// <param name="value">Valore da stampare</param>
        /// <param name="stringIfNull">Stringa da usare se value è null</param>
        /// <returns>Restituisce una stringa da stampare</returns>
        public static string Display(object? value, string? stringIfNull)
        {
            if (value is null)
            {
                if (stringIfNull is null)
                {
                    return string.Empty;
                }
                return stringIfNull;
            }
            else
            {
                if (stringIfNull is null)
                {
                    return value.ToString() ?? string.Empty;
                }
                return value.ToString() ?? stringIfNull;
            }
        }
        /// <summary>
        /// https://stackoverflow.com/questions/249760/how-can-i-convert-a-unix-timestamp-to-datetime-and-vice-versa
        /// https://stackoverflow.com/a/250400
        /// https://www.epochconverter.com/
        /// </summary>
        /// <param name="unixTimeStamp"></param>
        /// <returns></returns>
        public static DateTime? UnixTimeStampToDateTime(double? unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            if (unixTimeStamp != null)
            {
                DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
                dateTime = dateTime.AddSeconds((double)unixTimeStamp).ToLocalTime();
                return dateTime;
            }
            return null;
        }
        /// <summary>
        /// Geolocalizza un indirizzo con i parametri forniti, usando il servizio di geolocalizzazione di open-meteo
        /// https://open-meteo.com/en/docs/geocoding-api
        /// </summary>
        /// <param name="client">l'HttpClient utilizzato per effettuare le richieste all'endpoint delle api di geolocalizzazione </param>
        /// <param name="name">nome della località</param>
        /// <param name="language">lingua in cui viene presentato il risultato. Codice di due lettere</param>
        /// <param name="count">Numero di risultati restituiti. Il valore massimo è 100 e il minimo è 1</param>
        /// <returns></returns>
        public static async Task<(double? lat, double? lon)?> GeocodeByOpenMeteo(HttpClient client, string? name, string? language = "it", int count = 1)
        {
            string? nameEncoded = HttpUtility.UrlEncode(name);
            string geocodingUrl = $"https://geocoding-api.open-meteo.com/v1/search?name={nameEncoded}&count={count}&language={language}";
            try
            {
                HttpResponseMessage responseGeocoding = await client.GetAsync($"{geocodingUrl}");
                if (responseGeocoding.IsSuccessStatusCode)
                {
                    OpenMeteoGeocoding? geocodingResult = await responseGeocoding.Content.ReadFromJsonAsync<OpenMeteoGeocoding>();
                    if (geocodingResult != null && geocodingResult.Results?.Count > 0)
                    {
                        return (geocodingResult.Results[0].Latitude, geocodingResult.Results[0].Longitude);
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                if (ex is HttpRequestException || ex is ArgumentException)
                {
                    Debug.WriteLine(ex.Message + "\nIl recupero dei dati dal server non è riuscito");
                }
            }
            return null;
        }
        /// <summary>
        /// Restituisce la descrizione testuale della previsione meteo a partire dal codice di previsione
        /// </summary>
        /// <param name="code">Codice di previsione meteo</param>
        /// <returns></returns>
        public static string? WMOCodesInt(int? code)
        {
            string? result = code switch
            {
                0 => "clear sky",
                1 => "mainly clear",
                2 => "partly cloudy",
                3 => "overcast",
                45 => "fog",
                48 => "depositing rime fog",
                51 => "drizzle: light intensity",
                53 => "drizzle: moderate intensity",
                55 => "drizzle: dense intensity",
                56 => "freezing drizzle: light intensity",
                57 => "freezing drizzle: dense intensity",
                61 => "rain: slight intensity",
                63 => "rain: moderate intensity",
                65 => "rain: heavy intensity",
                66 => "freezing rain: light intensity",
                67 => "freezing rain: heavy intensity",
                71 => "snow fall: slight intensity",
                73 => "snow fall: moderate intensity",
                75 => "snow fall: heavy intensity",
                77 => "snow grains",
                80 => "rain showers: slight",
                81 => "rain showers: moderate",
                82 => "rain showers: violent",
                85 => "snow showers slight",
                86 => "snow showers heavy",
                95 => "thunderstorm: slight or moderate",
                96 => "thunderstorm with slight hail",
                99 => "thunderstorm with heavy hail",
                _ => null,
            };
            return result;
        }
        /// <summary>
        /// Restituisce la descrizione testuale della previsione meteo a partire dal codice di previsione in italiano
        /// </summary>
        /// <param name="code">Codice di previsione meteo</param>
        /// <returns></returns>
        public static string? WMOCodesIntIT(int? code)
        {
            string? result = code switch
            {
                0 => "cielo sereno",
                1 => "prevalentemente limpido",
                2 => "parzialmente nuvoloso",
                3 => "coperto",
                45 => "nebbia",
                48 => "nebbia con brina",
                51 => "pioggerellina di scarsa intensità",
                53 => "pioggerellina di moderata intensità",
                55 => "pioggerellina intensa",
                56 => "pioggerellina gelata di scarsa intensità",
                57 => "pioggerellina gelata intensa",
                61 => "pioggia di scarsa intensità",
                63 => "pioggia di moderata intensità",
                65 => "pioggia molto intensa",
                66 => "pioggia gelata di scarsa intensità",
                67 => "pioggia gelata intensa",
                71 => "nevicata di lieve entità",
                73 => "nevicata di media entità",
                75 => "nevicata intensa",
                77 => "granelli di neve",
                80 => "deboli rovesci di pioggia",
                81 => "moderati rovesci di pioggia",
                82 => "violenti rovesci di pioggia",
                85 => "leggeri rovesci di neve",
                86 => "pesanti rovesci di neve",
                95 => "temporale lieve o moderato",
                96 => "temporale con lieve grandine",
                99 => "temporale con forte grandine",
                _ => null,
            };
            return result;
        }
    }
}
```
### La gestione del tempo

Il riferimento temporale delle previsioni meteo e di altre misure restituito dalle API di Open-Meteo, ma anche di altri servizi di API di terze parti, è solitamente espresso in Unix timestamp.

Quando il tempo è espresso in Unix timestamp, il valore numerico rappresentativo di una data e ora locali è rappresentato come numero di secondi trascorsi dalla [Unix Epoch](https://it.wikipedia.org/wiki/Tempo_(Unix)), ossia dalla mezzanotte del primo gennaio 1970. La conversione da Unix timestamp a ora locale può essere fatta semplicemente con un metodo di conversione come il seguente:

```csharp
public static DateTime? UnixTimeStampToDateTime(double? unixTimeStamp)
        {
            // Unix timestamp is seconds past epoch
            if (unixTimeStamp != null)
            {
                DateTime dateTime = new(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
                dateTime = dateTime.AddSeconds((double)unixTimeStamp).ToLocalTime();
                return dateTime;
            }
            return null;
        }
```

### Interpretazione dei codici delle previsioni meteo

Le API di Open-Meteo non restituiscono una descrizione sotto forma di stringa delle previsioni meteo, ma riportano dei codici numerici che vanno opportunamente interpretati per determinare le previsioni meteo. Nella pagina principale della documentazione di Open-Meteo è riportata una tabella che definisce i codici delle previsioni meteo:

<https://open-meteo.com/en/docs>

Questa tabella può essere facilmente trasformata in un metodo che, dato il valore del codice restituito dalle API delle previsioni meteo, restituisce una stringa rappresentativa della previsione meteo stessa

### Esempio di applicazione client per Open-Meteo

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <Reference Include="HttpProxyControl">
      <HintPath>..\HttpProxyControl\bin\Debug\net9.0\HttpProxyControl.dll</HintPath>
    </Reference>
  </ItemGroup>
</Project>
```

Dopo aver ottenuto le coordinate GPS di una località si utilizzano le Weather API di Open Meteo:

<https://open-meteo.com/en/docs>

```csharp
//file: Program.cs
using HttpProxyControl;
using OpenMeteoAPIClient.Models.Minimal;
using System.Diagnostics;
using System.Net.Http.Json;
using System.Text.Json;
using System.Web;
namespace OpenMeteoAPIClient
{
    internal class Program
    {
        static readonly HttpClient _client = HttpProxyHelper.CreateHttpClient(setProxy: true);
        static async Task Main(string[] args)
        {
            await EsempioPrevisioniMeteo();
        }
        static async Task EsempioPrevisioniMeteo()
        {
            Console.WriteLine("\n****************************");
            Console.WriteLine("Metodo: EsempioPrevisioniMeteo");
            Console.WriteLine("****************************\n");
            const string datoNonFornitoString = "Dato non fornito";//si potrebbe mettere una stringa vuota
            try
            {
                string place = "Monticello Brianza";
                (double? lat, double? lon)? geo = await Utils.GeocodeByOpenMeteo(_client, place);
                if (geo != null)
                {
                    //richiesta di tutto (con il timezone di Roma):
                    //https://api.open-meteo.com/v1/forecast?latitude={geo?.lat}&longitude={geo?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=Europe%2FRome
                    //FormattableString addressUrlFormattable = $"https://api.open-meteo.com/v1/forecast?latitude={geo?.lat}&longitude={geo?.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,evapotranspiration,et0_fao_evapotranspiration,vapour_pressure_deficit,wind_speed_10m,wind_speed_80m,wind_speed_120m,wind_speed_180m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_9_to_27cm,soil_moisture_27_to_81cm&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&timeformat=unixtime&timezone=Europe%2FRome
                    //string addressUrl = FormattableString.Invariant(addressUrlFormattable);
                    //richiesta di quello che serve per questo esempio:
                    //https://api.open-meteo.com/v1/forecast?latitude={geo?.lat}&longitude={geo?.lon}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timeformat=unixtime&timezone=auto";
                    //https://learn.microsoft.com/en-us/dotnet/standard/base-types/best-practices-display-data#display-formatted-data
                    //https://learn.microsoft.com/en-us/dotnet/api/system.formattablestring.invariant
                    //per evitare di avere problemi con la cultura in uso (ad esempio con l'italiano che usa la virgola come separatore decimale) creiamo prima una FormattableString e poi la convertiamo in una stringa con una cultura English Invariant
                    FormattableString addressUrlFormattable = $"https://api.open-meteo.com/v1/forecast?latitude={geo?.lat}&longitude={geo?.lon}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timeformat=unixtime&timezone=auto";
                    string addressUrl = FormattableString.Invariant(addressUrlFormattable);
                    //string addressUrl = addressUrlFormattable.ToString(CultureInfo.InvariantCulture);
                    //se volessi la cultura italiana (in questo caso non funzionerebbe la chiamata all'endpoint remoto)
                    //string addressUrl = addressUrlFormattable.ToString(new CultureInfo("it-IT"));
                    var response = await _client.GetAsync($"{addressUrl}");
                    if (response.IsSuccessStatusCode)
                    {
                        //https://docs.microsoft.com/en-us/dotnet/standard/serialization/system-text-json-how-to?pivots=dotnet-6-0#httpclient-and-httpcontent-extension-methods
                        //HttpCliet già usa le impostazioni web defaults come JsonSerializerOptions.
                        OpenMeteoForecast? forecast = await response.Content.ReadFromJsonAsync<OpenMeteoForecast>();
                        if (forecast != null)
                        {
                            ////per stampare a console usiamo i web defaults
                            //JsonSerializerOptions options = new(JsonSerializerDefaults.Web) { WriteIndented = true };
                            //Console.WriteLine("Dati ricevuti dall'endpoint remoto:\n" + JsonSerializer.Serialize(forecast, options));
                            Console.WriteLine($"\nCondizioni meteo attuali per {place}");
                            Console.WriteLine($"Latitutide: {forecast.Latitude}; Longitudine: {forecast.Longitude}; Elevazione: {forecast.Elevation} m; TimeZone: {forecast.Timezone}");
                            if (forecast.Current != null)
                            {
                                Console.WriteLine($"Data e ora previsione: {Utils.Display(Utils.UnixTimeStampToDateTime(forecast.Current.Time), datoNonFornitoString)}");
                                Console.WriteLine($"Temperatura : {Utils.Display(forecast.Current.Temperature2m, datoNonFornitoString)} °C");
                                Console.WriteLine($"previsione: {Utils.Display(Utils.WMOCodesIntIT(forecast.Current.WeatherCode), datoNonFornitoString)}");
                                Console.WriteLine($"Direzione del vento: {Utils.Display(forecast.Current.WindDirection10m, datoNonFornitoString)} °");
                                Console.WriteLine($"Velocità del vento: {Utils.Display(forecast.Current.WindSpeed10m, datoNonFornitoString)} Km/h");
                            }
                            if (forecast.Daily != null)
                            {
                                Console.WriteLine($"\nPrevisioni meteo giornaliere per {place}");
                                int? numeroGiorni = forecast.Daily.Time?.Count;
                                if (numeroGiorni > 0)
                                {
                                    for (int i = 0; i < numeroGiorni; i++)
                                    {
                                        Console.WriteLine($"Data e ora = {Utils.Display(Utils.UnixTimeStampToDateTime(forecast.Daily?.Time?[i]), datoNonFornitoString)};" +
                                            $" T max = {Utils.Display(forecast.Daily?.Temperature2mMax?[i], datoNonFornitoString)} °C;" +
                                            $" T min = {Utils.Display(forecast.Daily?.Temperature2mMin?[i], datoNonFornitoString)} °C; " +
                                            $"previsione = {Utils.Display(Utils.WMOCodesIntIT(forecast.Daily?.WeatherCode?[i]), datoNonFornitoString)}");
                                    }
                                }
                            }
                            if (forecast.Hourly != null)
                            {
                                Console.WriteLine($"\nPrevisioni meteo ora per ora per {place}");
                                int? numeroPrevisioni = forecast.Hourly.Time?.Count;
                                if (numeroPrevisioni > 0)
                                {
                                    for (int i = 0; i < numeroPrevisioni; i++)
                                    {
                                        Console.WriteLine($"Data e ora = {Utils.Display(Utils.UnixTimeStampToDateTime(forecast.Hourly.Time?[i]), datoNonFornitoString)};" +
                                            $" T = {Utils.Display(forecast.Hourly.Temperature2m?[i], datoNonFornitoString)} °C;" +
                                            $" U = {Utils.Display(forecast.Hourly.RelativeHumidity2m?[i], datoNonFornitoString)} %;" +
                                            $" T percepita = {Utils.Display(forecast.Hourly.ApparentTemperature?[i], datoNonFornitoString)};" +
                                            $" Prob. di rovesci = {Utils.Display(forecast.Hourly.PrecipitationProbability?[i] * 1.0, datoNonFornitoString)} %; " +
                                            $" previsione = {Utils.Display(Utils.WMOCodesIntIT(forecast.Hourly.WeatherCode?[i]), datoNonFornitoString)}");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                if (ex is HttpRequestException || ex is ArgumentException)
                {
                    Console.WriteLine(ex.Message + "\nIl recupero dei dati dal server non è riuscito");
                }
            }
        }
    }
}
```

## MediaWiki API

La piattaforma Mediawiki, alla base del sito Wikipedia, offre diverse tipologie di API.

### MediaWiki Action API

<https://www.mediawiki.org/wiki/API:Tutorial>

The [MediaWiki Action API](https://www.mediawiki.org/wiki/Special:MyLanguage/API:Main_page "Special:MyLanguage/API:Main page") is a [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer#Applied_to_Web_services "w:Representational state transfer") [web service](https://en.wikipedia.org/wiki/web_service "w:web service") that allows users to perform certain wiki-actions like page creation, authentication, parsing, searching, etc.

#### Esempio: ricerca full-text in Wikipedia

[https://www.mediawiki.org/wiki/API:Search#GET_request](https://www.mediawiki.org/wiki/API:Search#GET_request)

Ad esempio, vigliamo ricercare le pagine di Wikipedia che contengono argomenti relativi alla seguente frase: "lingua parlata dagli eschimesi".

La query da effettuare è (imponendo, ad esempio, il limite di 5 risultati):

<https://it.wikipedia.org/w/api.php?action=query&list=search&srsearch=lingua%20parlata%20dagli%20eschimesi&utf8=&format=json&srlimit=5>

Il risultato riportato di seguito permette di ottenere un elenco di pagine riferite all'argomento in ordine decrescente di rilevanza:

```json
{
  "batchcomplete": "",
  "continue": {
    "sroffset": 5,
    "continue": "-||"
  },
  "query": {
    "searchinfo": {
      "totalhits": 28
    },
    "search": [
      {
        "ns": 0,
        "title": "Lingua groenlandese",
        "pageid": 330971,
        "size": 9591,
        "wordcount": 982,
        "snippet": "(anche denominato <span class="searchmatch"></span>eschimese</span> di Groenlandia o inuktitut groenlandese, pronuncia /kalaːɬːisʉt/; grønlandsk in danese), è una <span class="searchmatch">lingua</span> appartenente alla famiglia",
        "timestamp": "2024-01-28T10:43:05Z"
      },
      {
        "ns": 0,
        "title": "Lingua inuktitut",
        "pageid": 604485,
        "size": 7226,
        "wordcount": 398,
        "snippet": "delle <span class="searchmatch">lingue</span> <span class="searchmatch">eschimesi</span>, a loro volta parte della Famiglia linguistica delle <span class="searchmatch">Lingue</span> eschimo-aleutine. Secondo Ethnologue e lo standard ISO 639, la <span class="searchmatch">lingua</span> inuktitut",
        "timestamp": "2023-02-13T10:36:47Z"
      },
      {
        "ns": 0,
        "title": "Lingue eschimo-aleutine",
        "pageid": 1096718,
        "size": 131970,
        "wordcount": 794,
        "snippet": "così composta: <span class="searchmatch">Lingua</span> aleutina [codice ISO 639-3 ale] <span class="searchmatch">Lingue</span> <span class="searchmatch">eschimesi</span> <span class="searchmatch">Lingue</span> inuit <span class="searchmatch">Lingua</span> inuktitut canadese orientale [ike] <span class="searchmatch">Lingua</span> inuinnaqtun o inuktitut",
        "timestamp": "2023-12-01T20:25:51Z"
      },
      {
        "ns": 0,
        "title": "Inuit",
        "pageid": 114025,
        "size": 19587,
        "wordcount": 2184,
        "snippet": "all'ambiente naturale. Lo stesso argomento in dettaglio: <span class="searchmatch">Lingua</span> inuit. La <span class="searchmatch">lingua</span> inuit è tradizionalmente <span class="searchmatch">parlata</span> in tutta l'Artide nordamericana e in alcune parti",
        "timestamp": "2024-03-06T20:15:46Z"
      },
      {
        "ns": 0,
        "title": "Lingua inuit",
        "pageid": 422231,
        "size": 26390,
        "wordcount": 3113,
        "snippet": "Per <span class="searchmatch">lingua</span> inuit si intende un continuum di <span class="searchmatch">lingue</span> appartenenti alla famiglia delle <span class="searchmatch">lingue</span> eschimo-aleutine tradizionalmente <span class="searchmatch">parlata</span> in tutta l'Artide",
        "timestamp": "2023-10-03T13:37:53Z"
      }
    ]
  }
}
```

#### Esempio: estrazione del summary di una pagina

Una volta ottenute le pagine rilevanti possiamo effettuare una ulteriore ricerca su esse per estrarre, ad esempio, il summary della pagina più pertinente. Infatti, leggendo la documentazione ufficiale di MediaWiki e alcune discussioni su StackOverflow, si deduce che:

Documentazione: <https://en.wikipedia.org/w/api.php?action=help&modules=query%2Bextracts>

<https://stackoverflow.com/a/28401782>

<https://stackoverflow.com/questions/8555320/is-there-a-wikipedia-api-just-for-retrieve-the-content-summary>

Per ottenere il summary di una pagina da Wikipedia, basta effettuare la query: [https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles={titolo della pagina}](https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=%7btitolo%20della%20pagina%7d)

Ad esempio, prendendo come titolo della pagina quello del primo risultato della query relativa alla lingua parlata dagli eschimesi, otteniamo:

<https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Lingua%20groenlandese>

```json
{
  "batchcomplete": "",
  "query": {
    "pages": {
      "330971": {
        "pageid": 330971,
        "ns": 0,
        "title": "Lingua groenlandese",
        "extract": "Il groenlandese o (per sineddoche) kalaallisut (anche denominato eschimese di Groenlandia o inuktitut groenlandese, pronuncia /kalaːɬːisʉt/; grønlandsk in danese), è una lingua appartenente alla famiglia delle lingue eschimo-aleutine. Parlato in Groenlandia, è strettamente imparentata alle lingue canadesi come l'inuktitut."
      }
    }
  }
}
```

#### Analisi del JSON DOM con la classe JsonDocument

L'esempio precedente, relativo all'oggetto JSON restituito dall'action API di Wikipedia mette in luce una questione molto importante: non sempre è possibile effettuare la de-serializzazione di un oggetto JSON, mediante un modello precostituito, come è stato fatto negli esempi di Open-Meteo, di Bing Maps e di tanti altri casi presi in considerazione. Nell'oggetto JSON restituito dall'action API:

[https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles={titolo della pagina}](https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=%7btitolo%20della%20pagina%7d)

l'oggetto "pages" contiene al suo interno un campo che corrisponde all'id della pagina restituita e che quindi cambia da pagina a pagina. Ad esempio, il summary della pagina di Wikipedia relativa a Dante Alighieri è:

[https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Dante_Alighieri](https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Dante_Alighieri)

```json
{
  "batchcomplete": "",
  "query": {
    "normalized": [
      {
        "from": "Dante_Alighieri",
        "to": "Dante Alighieri"
      }
    ],
    "pages": {
      "1476868": {
        "pageid": 1476868,
        "ns": 0,
        "title": "Dante Alighieri",
        "extract": "summary di Dante Alighieri..."
      }
    }
  }
}
```

In questo caso non si può fare una de-serializzazione, perché il Model cambia a seconda della pagina richiesta (la parte in giallo cambia). Per trattare questo caso occorre effettuare un'analisi del JSON DOM (Document Object Model), come descritto nella documentazione ufficiale di .NET: <https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/use-dom-utf8jsonreader-utf8jsonwriter?#json-dom-choices>

Working with a DOM is an alternative to deserialization with [JsonSerializer](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsonserializer):

-         When you don't have a type to deserialize into.

-         When the JSON you receive doesn't have a fixed schema and must be inspected to know what it contains.

System.Text.Json provides two ways to build a JSON DOM:

-         [JsonDocument](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsondocument) provides the ability to build a read-only DOM by using Utf8JsonReader. The JSON elements that compose the payload can be accessed via the [JsonElement](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement) type. The JsonElement type provides array and object enumerators along with APIs to convert JSON text to common .NET types. JsonDocument exposes a [RootElement](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsondocument.rootelement#system-text-json-jsondocument-rootelement) property. For more information, see [Use JsonDocument](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/use-dom-utf8jsonreader-utf8jsonwriter?pivots=dotnet-7-0#use-jsondocument) later in this article.

-         [JsonNode](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonnode) and the classes that derive from it in the [System.Text.Json.Nodes](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes) namespace provide the ability to create a mutable DOM. The JSON elements that compose the payload can be accessed via the [JsonNode](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonnode), [JsonObject](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonobject), [JsonArray](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonarray), [JsonValue](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.nodes.jsonvalue), and [JsonElement](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement) types. For more information, see [Use JsonNode](https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/use-dom-utf8jsonreader-utf8jsonwriter?pivots=dotnet-7-0#use-jsonnode) later in this article.

Consider the following factors when choosing between JsonDocument and JsonNode:

-         The JsonNode DOM can be changed after it's created. The JsonDocument DOM is immutable.

-         The JsonDocument DOM provides faster access to its data.

Fondamentalmente si sono due oggetti che si possono utilizzare per la gestione del JSON DOM: JsonDocument (disponibile dalla versione .NET 5) e JsonNode (disponibile dalla versione .NET 6). JsonNode offre funzionalità aggiuntive rispetto a JsonDocument, poiché consente di modificare dinamicamente il DOM. Tuttavia, se bisogna soltanto analizzare il DOM, senza doverlo modificare dinamicamente, si può utilizzare tranquillamente JsonDocument che ha prestazioni superiori nell'accesso ai dati.

Nell'esempio seguente viene mostrato come utilizzare la classe JsonDocument per estrarre il campo "extract" dall'oggetto JSON restituito dalle action API di mediawiki quando si richiede il summary di una pagina:

```csharp
using System.Text;
using System.Text.Json;
using HttpProxyControl;
namespace JSONDocumentWikiSummaryDemo
{
    class Program
    {
        static async Task Main(string[] args)
        {
            string wikiUrl = "https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Dante_Alighieri";
            HttpClient client =  HttpProxyHelper.CreateHttpClient(setProxy:true);
            //ottengo la risposta da Wikipedia come stringa
            string wikiSummaryJSON = await client.GetStringAsync(wikiUrl);
            string summary = ExtractSummaryFromJSON(wikiSummaryJSON);
            Console.OutputEncoding = Encoding.Unicode;
            Console.WriteLine(summary);
        }
        /// <summary>
        /// Estrae il campo summary dal JSON restituito dall'Action API di Wikipedia
        /// </summary>
        /// <param name="wikiSummary">il summary in formato JSON</param>
        /// <returns>La stringa corrispondente al contenuto del campo extract, stringa vuota se non riesce a fare l'estrazione</returns>
        private static string ExtractSummaryFromJSON(string wikiSummary)
        {
            using JsonDocument document = JsonDocument.Parse(wikiSummary);
            JsonElement root = document.RootElement;
            JsonElement query = root.GetProperty("query");
            JsonElement pages = query.GetProperty("pages");
            //per prendere il primo elemento dentro pages, creo un enumeratore delle properties
            JsonElement.ObjectEnumerator enumerator = pages.EnumerateObject();
            //quando si crea un enumeratore su una collection, si deve farlo avanzare di una posizione per portarlo sul primo elemento della collection
            //il primo elemento corrisponde all'id della pagina all'interno dell'oggetto pages
            if (enumerator.MoveNext())
            {
                //accedo all'elemento
                JsonElement targetJsonElem = enumerator.Current.Value;
                if (targetJsonElem.TryGetProperty("extract", out JsonElement extract))
                {
                    return extract.GetString()?? string.Empty;
                }
            }
            return string.Empty;
        }
    }
}
```

```text
//Output:

*Dante Alighieri, o Alighiero, battezzato Durante di Alighiero degli Alighieri e anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 -- Ravenna, notte tra il 13 e il 14 settembre 1321), è stato un poeta, scrittore e politico italiano.*

*Il nome "Dante", secondo la testimonianza di Jacopo Alighieri, è un ipocoristico di Durante; nei documenti era seguito dal patronimico Alagherii o dal gentilizio de Alagheriis, mentre la variante "Alighieri" si affermò solo con l'avvento di Boccaccio.*

*È considerato il padre della lingua italiana; la sua fama è dovuta alla paternità della Comedìa, divenuta celebre come Divina Commedia e universalmente considerata la più grande opera scritta in lingua italiana e uno dei maggiori capolavori della letteratura mondiale. Espressione della cultura medievale, filtrata attraverso la lirica del Dolce stil novo, la Commedia è anche veicolo allegorico della salvezza umana, che si concretizza nel toccare i drammi dei dannati, le pene purgatoriali e le glorie celesti, permettendo a Dante di offrire al lettore uno spaccato di morale ed etica.*

*Importante linguista, teorico politico e filosofo, Dante spaziò all'interno dello scibile umano, segnando profondamente la letteratura italiana dei secoli successivi e la stessa cultura occidentale, tanto da essere soprannominato il "Sommo Poeta" o, per antonomasia, il "Poeta". Dante, le cui spoglie si trovano a Ravenna nella tomba costruita nel 1780 da Camillo Morigia, in epoca romantica divenne il principale simbolo dell'identità nazionale italiana. Da lui prende il nome il principale ente della diffusione della lingua italiana nel mondo, la Società Dante Alighieri, mentre gli studi critici e filologici sono mantenuti vivi dalla Società dantesca.*
```

### MediaWiki REST API

[https://www.mediawiki.org/wiki/API:REST_API/Reference](https://www.mediawiki.org/wiki/API:REST_API/Reference)

#### Esempio: trovare le pagine su un argomento

La documentazione di riferimento è quella relativa alla ricerca di una pagina:

[https://www.mediawiki.org/wiki/API:REST_API/Reference#Search_pages](https://www.mediawiki.org/wiki/API:REST_API/Reference#Search_pages)

Leggendo la documentazione si scopre che per ricercare la prima pagina di Wikipedia che tratta un determinato argomento, si può utilizzare il seguente url:

[https://it.wikipedia.org/w/rest.php/v1/search/page?q={parole](https://it.wikipedia.org/w/rest.php/v1/search/page?q=%7bparole) da cercare}&limit={limit_value}

*Searches wiki page titles and contents for the provided search terms, and returns matching pages.*

Ad esempio, trovare le pagine relative alla ricerca "lingua parlata dagli eschimesi" (imponendo il limite di 5 risultati):

<https://it.wikipedia.org/w/rest.php/v1/search/page?q=lingua%20parlata%20dagli%20eschimesi&limit=5>

```json
{
  "pages": [
    {
      "id": 330971,
      "key": "Lingua_groenlandese",
      "title": "Lingua groenlandese",
      "excerpt": "(anche denominato <span class="searchmatch">eschimese</span> di Groenlandia o inuktitut groenlandese, pronuncia /kalaːɬːisʉt/; grønlandsk in danese), è una <span class="searchmatch">lingua</span> appartenente alla famiglia",
      "matched_title": null,
      "description": "lingua appartenente alla famiglia delle lingue eschimo-aleutine",
      "thumbnail": {
        "mimetype": "image/png",
        "width": 60,
        "height": 50,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Idioma_groenland%C3%A9s.png/60px-Idioma_groenland%C3%A9s.png"
      }
    },
    {
      "id": 604485,
      "key": "Lingua_inuktitut",
      "title": "Lingua inuktitut",
      "excerpt": "delle <span class="searchmatch">lingue</span> <span class="searchmatch">eschimesi</span>, a loro volta parte della Famiglia linguistica delle <span class="searchmatch">Lingue</span> eschimo-aleutine. Secondo Ethnologue e lo standard ISO 639, la <span class="searchmatch">lingua</span> inuktitut",
      "matched_title": null,
      "description": "lingua eschimo-aleutina",
      "thumbnail": null
    },
    {
      "id": 1096718,
      "key": "Lingue_eschimo-aleutine",
      "title": "Lingue eschimo-aleutine",
      "excerpt": "così composta: <span class="searchmatch">Lingua</span> aleutina [codice ISO 639-3 ale] <span class="searchmatch">Lingue</span> <span class="searchmatch">eschimesi</span> <span class="searchmatch">Lingue</span> inuit <span class="searchmatch">Lingua</span> inuktitut canadese orientale [ike] <span class="searchmatch">Lingua</span> inuinnaqtun o inuktitut",
      "matched_title": null,
      "description": "famiglia linguistica nativa della Groenlandia, Canada del nord, Alaska e parte della Siberia",
      "thumbnail": {
        "mimetype": "image/png",
        "width": 60,
        "height": 54,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Eskimo-Aleut_langs.png/60px-Eskimo-Aleut_langs.png"
      }
    },
    {
      "id": 114025,
      "key": "Inuit",
      "title": "Inuit",
      "excerpt": "all'ambiente naturale. Lo stesso argomento in dettaglio: <span class="searchmatch">Lingua</span> inuit. La <span class="searchmatch">lingua</span> inuit è tradizionalmente <span class="searchmatch">parlata</span> in tutta l'Artide nordamericana e in alcune parti",
      "matched_title": null,
      "description": "popolo dell'Artico",
      "thumbnail": {
        "mimetype": "image/jpeg",
        "width": 60,
        "height": 48,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Inuit-Kleidung_1.jpg/60px-Inuit-Kleidung_1.jpg"
      }
    },
    {
      "id": 422231,
      "key": "Lingua_inuit",
      "title": "Lingua inuit",
      "excerpt": "Per <span class="searchmatch">lingua</span> inuit si intende un continuum di <span class="searchmatch">lingue</span> appartenenti alla famiglia delle <span class="searchmatch">lingue</span> eschimo-aleutine tradizionalmente <span class="searchmatch">parlata</span> in tutta l'Artide",
      "matched_title": null,
      "description": "lingua",
      "thumbnail": {
        "mimetype": "image/svg+xml",
        "width": 60,
        "height": 54,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/8/88/Inuktitut_dialect_map.svg/60px-Inuktitut_dialect_map.svg.png"
      }
    }
  ]
}
```

A seguito della prima ricerca si può effettuare una seconda ricerca per ottenere il summary del risultato più pertinente, come già mostrato nell'esempio della Action API:

Documentazione: <https://www.mediawiki.org/wiki/Extension:TextExtracts#API>

Esempio:

[https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Lingua_groenlandese](https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Lingua_groenlandese)

Il risultato è lo stesso dell'esempio precedente:

```json
{
  "batchcomplete": "",
  "query": {
    "normalized": [
      {
        "from": "Lingua_groenlandese",
        "to": "Lingua groenlandese"
      }
    ],
    "pages": {
      "330971": {
        "pageid": 330971,
        "ns": 0,
        "title": "Lingua groenlandese",
        "extract": "Il groenlandese o (per sineddoche) kalaallisut (anche denominato eschimese di Groenlandia o inuktitut groenlandese, pronuncia /kalaːɬːisʉt/; grønlandsk in danese), è una lingua appartenente alla famiglia delle lingue eschimo-aleutine. Parlato in Groenlandia, è strettamente imparentata alle lingue canadesi come l'inuktitut."
      }
    }
  }
}
```

#### Esempio: trovare il summary di una pagina che contiene le parole cercate

Ad esempio: ricercare la pagina di Wikipedia che parla di Dante Alighieri:

<https://it.wikipedia.org/w/rest.php/v1/search/page?q=dante%20alighieri&limit=1>

Nota: impostando limit=1 prendiamo solo la prima pagina, la più pertinente.

Si ottiene:
  
```json
{
  "pages": [
    {
      "id": 1476868,
      "key": "Dante_Alighieri",
      "title": "Dante Alighieri",
      "excerpt": "Alighieri, o <span class="searchmatch">Alighiero</span>, battezzato Durante di <span class="searchmatch">Alighiero</span> degli <span class="searchmatch">Alighieri</span> e anche noto con il solo nome di <span class="searchmatch">Dante</span>, della famiglia <span class="searchmatch">Alighieri</span> (Firenze, tra",
      "matched_title": null,
      "description": "poeta, scrittore e politico fiorentino, considerato il padre della lingua italiana (1265-1321)",
      "thumbnail": {
        "mimetype": "image/jpeg",
        "width": 60,
        "height": 91,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Portrait_de_Dante.jpg/60px-Portrait_de_Dante.jpg"
      }
    }
  ]
}
```

Prendendo la chiave (campo "key": "Dante_Alighieri") dal risultato precedente e invocando la Action API per ottenere il summary abbiamo:

[https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Dante_Alighieri](https://it.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&exsectionformat=plain&redirects=1&titles=Dante_Alighieri)

Il cui risultato è:

```json
{
  "batchcomplete": "",
  "query": {
    "normalized": [
      {
        "from": "Dante_Alighieri",
        "to": "Dante Alighieri"
      }
    ],
    "pages": {
      "1476868": {
        "pageid": 1476868,
        "ns": 0,
        "title": "Dante Alighieri",
        "extract": "Dante Alighieri, o Alighiero, battezzato Durante di Alighiero degli Alighieri e anche noto con il solo nome di Dante, della famiglia Alighieri (Firenze, tra il 14 maggio e il 13 giugno 1265 -- Ravenna, notte tra il 13 e il 14 settembre 1321), è stato un poeta, scrittore e politico italiano.\nIl nome "Dante", secondo la testimonianza di Jacopo Alighieri, è un ipocoristico di Durante; nei documenti era seguito dal patronimico Alagherii o dal gentilizio de Alagheriis, mentre la variante "Alighieri" si affermò solo con l'avvento di Boccaccio. \nÈ considerato il padre della lingua italiana; la sua fama è dovuta alla paternità della Comedìa, divenuta celebre come Divina Commedia e universalmente considerata la più grande opera scritta in lingua italiana e uno dei maggiori capolavori della letteratura mondiale. Espressione della cultura medievale, filtrata attraverso la lirica del Dolce stil novo, la Commedia è anche veicolo allegorico della salvezza umana, che si concretizza nel toccare i drammi dei dannati, le pene purgatoriali e le glorie celesti, permettendo a Dante di offrire al lettore uno spaccato di morale ed etica. \nImportante linguista, teorico politico e filosofo, Dante spaziò all'interno dello scibile umano, segnando profondamente la letteratura italiana dei secoli successivi e la stessa cultura occidentale, tanto da essere soprannominato il "Sommo Poeta" o, per antonomasia, il "Poeta". Dante, le cui spoglie si trovano a Ravenna nella tomba costruita nel 1780 da Camillo Morigia, in epoca romantica divenne il principale simbolo dell'identità nazionale italiana. Da lui prende il nome il principale ente della diffusione della lingua italiana nel mondo, la Società Dante Alighieri, mentre gli studi critici e filologici sono mantenuti vivi dalla Società dantesca."
      }
    }
  }
}
```

Da questo risultato si può leggere l'estratto della pagina relativa a Dante Alighieri, prendendo il valore del campo "extract".

#### Esempio: trovare le sezioni di una pagina di Wikipedia

La documentazione di riferimento è quella relativa al parsing: [https://www.mediawiki.org/wiki/API:Parsing_wikitext](https://www.mediawiki.org/wiki/API:Parsing_wikitext)

Supponiamo di voler trovare la parte della pagina di wikipedia che parla delle opere di Giovanni Boccaccio. Procediamo nel seguente modo:

Step 1: otteniamo la pagina relativa a una query string: In questo caso la query string è "opere di Giovanni Boccaccio"

[https://it.wikipedia.org/w/rest.php/v1/search/page?q={query string}&limit=1](https://it.wikipedia.org/w/rest.php/v1/search/page?q=%7bquery%20string%7d&limit=1)

In questo caso:

<https://it.wikipedia.org/w/rest.php/v1/search/page?q=opere%20di%20Giovanni%20Boccaccio&limit=1>

Il risultato è:

```json
{
  "pages": [
    {
      "id": 2952346,
      "key": "Giovanni_Boccaccio",
      "title": "Giovanni Boccaccio",
      "excerpt": "Disambiguazione -- &quot;<span class="searchmatch">Boccaccio</span>&quot; rimanda qui. Se stai cercando altri significati, vedi <span class="searchmatch">Boccaccio</span> (disambigua). Disambiguazione -- Se stai cercando il militare",
      "matched_title": null,
      "description": "scrittore e poeta italiano (1313-1375)",
      "thumbnail": {
        "mimetype": "image/jpeg",
        "width": 60,
        "height": 94,
        "duration": null,
        "url": "//upload.wikimedia.org/wikipedia/commons/thumb/2/29/Andrea_del_Castagno_Giovanni_Boccaccio_c_1450.jpg/60px-Andrea_del_Castagno_Giovanni_Boccaccio_c_1450.jpg"
      }
    }
  ]
}
```

Scopriamo che la chiave (page_key) è "key": "Giovanni_Boccaccio"

Step 2: otteniamo le sezioni della pagina selezionata allo step precedente

Con la chiave ottenuta effettuiamo una Action API call per estrarre le informazioni che ci interessano. In particolare, seguendo quanto riportato in:

 <https://stackoverflow.com/a/59511898>

<https://stackoverflow.com/questions/59499885/how-to-get-a-text-of-a-specific-section-via-wikipedia-api>

Scopriamo che possiamo avere **l'elenco delle sezioni di una pagina di Wikipedia** con la Action API:

[https://it.wikipedia.org/w/api.php?action=parse&format=json&page={page_key}&prop=sections&disabletoc=1](https://it.wikipedia.org/w/api.php?action=parse&format=json&page=%7bpage_key%7d&prop=sections&disabletoc=1)

In questo caso: [https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=sections&disabletoc=1](https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=sections&disabletoc=1)

Il risultato è:

```json
{
  "parse": {
    "title": "Giovanni Boccaccio",
    "pageid": 2952346,
    "sections": [
      {
        "toclevel": 1,
        "level": "2",
        "line": "Biografia",
        "number": "1",
        "index": "1",
        "fromtitle": "Giovanni_Boccaccio",
        "byteoffset": 5192,
        "anchor": "Biografia",
        "linkAnchor": "Biografia"
      },
      {
        "toclevel": 2,
        "level": "3",
        "line": "L'infanzia fiorentina (1313-1327)",
        "number": "1.1",
        "index": "2",
        "fromtitle": "Giovanni_Boccaccio",
        "byteoffset": 5208,
        "anchor": "L'infanzia_fiorentina_(1313-1327)",
        "linkAnchor": "L'infanzia_fiorentina_(1313-1327)"
      },
      {
        "toclevel": 2,
        "level": "3",
        "line": "L'adolescenza napoletana (1327-1340)",
        "number": "1.2",
        "index": "3",
        "fromtitle": "Giovanni_Boccaccio",
        "byteoffset": 8118,
        "anchor": "L'adolescenza_napoletana_(1327-1340)",
        "linkAnchor": "L'adolescenza_napoletana_(1327-1340)"
      },
         //le opere sono tante... per vederle tutte guardare il link nel browser
{
  "toclevel": 2,
  "level": "3",
  "line": "Opere del periodo napoletano",
  "number": "2.1",
  "index": "24",
  "fromtitle": "Giovanni_Boccaccio",
  "byteoffset": 49733,
  "anchor": "Opere_del_periodo_napoletano",
  "linkAnchor": "Opere_del_periodo_napoletano"
}
    ],
    "showtoc": ""
  }
}
```

Step 3: otteniamo il contenuto di una specifica sezione

Possiamo **ottenere il contenuto di una specifica sezione di una pagina di Wikipedia** con la Action API:

[https://it.wikipedia.org/w/api.php?action=parse&format=json&page={page_key}&prop=wikitext&section={section number}&disabletoc=1](https://it.wikipedia.org/w/api.php?action=parse&format=json&page=%7bpage_key%7d&prop=wikitext&section=%7bsection%20number%7d&disabletoc=1)

Ad esempio, per accedere alla sezione delle *opere del periodo napolatano* della pagina relativa a Giovanni Boccaccio osserviamo che le sezioni sono tutte numerate con un indice.

Per ottenere la sezione relativa alle "*opere del periodo napoletano*", possiamo effettuare la richiesta:

[https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=wikitext&section=24&disabletoc=1](https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=wikitext&section=24&disabletoc=1)

Il risultato è:

```json
{
  "parse": {
    "title": "Giovanni Boccaccio",
    "pageid": 2952346,
    "wikitext": {
      "*": "=== Opere del periodo napoletano ===\n{{vedi anche|Opere della giovinezza di Giovanni Boccaccio}}\n\nTra le sue prime opere del periodo napoletano vengono ricordate: ''[[Caccia di Diana]]'' (1334 circa)<ref>{{Cita|Branca 1977|p. 41}}.</ref>, ''[[Filostrato (poema)|Filostrato]]'' (1335), il ''[[Filocolo]]'' (1336-38)<ref>{{Cita|Branca 1977|p. 44}}.</ref>, ''[[Teseida]]'' (1339-41)<ref>{{Cita|Branca 1977|p. 49}}.</ref>.\n\n==== ''La Caccia di Diana'' (1333--1334) ====\n{{vedi anche|Caccia di Diana}}\n\nLa ''[[Caccia di Diana]]'' è un poemetto di 18 [[Canto (metrica)|canti]] in [[Terzina dantesca|terzine dantesche]] che celebra in chiave mitologica alcune gentildonne napoletane. Le ninfe, seguaci della casta [[Diana]], si ribellano alla dea e offrono le loro prede di caccia a [[Venere (divinità)|Venere]], che trasforma gli animali in bellissimi uomini. Tra questi vi è anche il giovane Boccaccio che, grazie all'amore, diviene un uomo pieno di virtù: il poemetto propone, dunque, la concezione cortese e [[Dolce stil novo|stilnovistica]] dell'amore che ingentilisce e nobilita l'essere umano<ref>{{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-caccia-di-diana-analisi-e-commento-4334.html|titolo = Boccaccio, "La Caccia di Diana": analisi e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== Il ''Filostrato'' (1335) ====\n{{vedi anche|Filostrato (poema)}}\n[[File:Boccaccio Altonensis 1.jpg|miniatura|Codice riportante un passo del ''Filostrato''. ''Codex Christianei'', conservato nella Bibliotheca Gymnasii Altonani ([[Amburgo]])]]\n\nIl ''[[Filostrato (poema)|Filostrato]]'' (che alla lettera dovrebbe significare nel [[lingua greca|greco]] approssimativo del Boccaccio «vinto d'amore») è un poemetto scritto in [[ottava rima|ottave]] che narra la tragica storia di [[Troilo]], figlio del [[re di Troia]] [[Priamo]], che si era innamorato della principessa greca [[Criseide]]. La donna, in seguito a uno scambio di prigionieri, torna al campo greco, e dimentica Troilo. Quando Criseide in seguito s'innamora di Diomede, Troilo si dispera e va incontro alla morte per mano di [[Achille]]. Nell'opera l'autore si confronta in maniera diretta con la precedente tradizione dei «cantari», fissando i parametri per un nuovo tipo di ottava essenziale per tutta la letteratura italiana fino al [[XVII secolo|Seicento]]<ref>{{Cita|Branca 1977|pp. 42-43}}.</ref>. Il linguaggio adottato è difficile, altolocato, spedito, a differenza di quello presente nel ''Filocolo'', in cui è molto sovrabbondante<ref>Per il ''Filostrato'' in generale, si veda: {{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/filostrato-boccaccio-trama-4331.html|titolo = Boccaccio, "Il Filostrato": riassunto e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== Il ''Filocolo'' (1336-1339) ====\n{{vedi anche|Filocolo}}\n\nIl ''[[Filocolo]]'' (secondo un'etimologia approssimativa «fatica d'amore») è un romanzo in prosa: rappresenta una svolta rispetto ai romanzi delle origini scritti in versi. La storia ha come protagonisti Florio, figlio di un re saraceno, e Biancifiore (o Biancofiore), una schiava cristiana abbandonata da bambina. I due fanciulli crescono assieme e da grandi, in seguito alla lettura del libro di [[Publio Ovidio Nasone|Ovidio]] ''[[Ars amatoria|Ars Amandi]]'' s'innamorano, come era successo per [[Paolo e Francesca]] dopo avere letto ''[[Ginevra (ciclo arturiano)|Ginevra]] e [[Lancillotto]]''. Tuttavia il padre di Florio decide di separarli vendendo Biancifiore a dei mercanti. Florio decide quindi di andarla a cercare e dopo mille peripezie (da qui il titolo ''Filocolo'') la rincontra. Infine, il giovane si converte al [[cristianesimo]] e sposa la fanciulla<ref>{{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-filocolo-trama-4361.html|titolo = Boccaccio, "Il Filocolo": riassunto e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== ''Teseida delle nozze d'Emilia'' (1339-1340) ====\n{{vedi anche|Teseida}}\n[[File:Emilia in the rosegarden (Teseida).jpg|thumb|upright=1.5|''Emilia nel roseto'', manoscritto francese del 1460 ca.|alt=]]\n\nIl ''[[Teseida]]'' è un poema epico in ottave in cui si rievocano le gesta di [[Teseo]] che combatte contro [[Tebe (città greca antica)|Tebe]] e le [[Amazzoni]]. L'opera costituisce il primo caso in assoluto nella storia letteraria in lingua italiana di poema epico in volgare e già si manifesta la tendenza di Boccaccio a isolare nuclei narrativi sentimentali, cosicché il vero centro della narrazione finisce per essere l'amore dei prigionieri tebani [[Arcita]] e [[Palemone (divinità)|Palemone]], molto amici, per Emilia, regina delle Amazzoni e cognata di Teseo; il duello fra i due innamorati si conclude con la morte di Arcita e le nozze tra Palemone ed Emilia<ref>Per il ''Teseida'' in generale, si veda: {{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-teseida-introduzione-e-commento-dell-opera-4392.html|titolo = Boccaccio, "Teseida": introduzione e commento dell'opera|accesso = 23 giugno 2015|editore = Oilproject}}</ref>."
    }
  }
}
```

Il formato del testo è wikitext. Se invece si inserisce come parametro della query prop=text si ottiene il risultato sotto forma di HTML.

[https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=text&section=24&disabletoc=1](https://it.wikipedia.org/w/api.php?action=parse&format=json&page=Giovanni_Boccaccio&prop=text&section=24&disabletoc=1)

#### Da wikitext a testo leggibile

Il formato wikitext è un linguaggio di markup, con una sua sintassi e parole chiave. I dettagli del linguaggio sono specificati qui: <https://en.wikipedia.org/wiki/Help:Wikitext>

Per trasformare il formato wikitext in un formato di testo leggibile senza i tag occorre effettuare un parsing del wikitext. In altre parole, occorre interpretare i tag e la struttura del documento per estrarre solo le informazioni che interessano (il PlainText). Per fare questo esistono diversi software di parsing già disponibili per diversi linguaggi di programmazione. Al link: [https://www.mediawiki.org/wiki/Alternative_parsers](https://www.mediawiki.org/wiki/Alternative_parsers) c'è un elenco completo.

Per il linguaggio C# esiste il progetto: <https://github.com/CXuesong/MwParserFromScratch>

Per utilizzare MWParserFromScratch occorre installare, tramite NuGet la libreria **CXuesong.MW.MwParserFromScratch**. Successivamente si può utilizzare, come mostrato di seguito, il parser.

Nel seguente esempio è stato creato il progetto di tipo libreria **WikitextExtensions**:

```csharp
//file WikitextHelper.cs
using MwParserFromScratch;
using MwParserFromScratch.Nodes;
using System.Text;
namespace WikitextExtensions
{
    public static class WikitextHelper
    {
        /// <summary>
        /// Converte un testo in formato wikitext in testo leggibile
        /// </summary>
        /// <param name="wikitext">Il wikitext in input</param>
        /// <returns>La stringa corrispondente al testo leggibile</returns>
        public static string WikiTextToReadableText(this string wikitext)
        {
            //https://github.com/CXuesong/MwParserFromScratch
            var parser = new WikitextParser();
            var ast = parser.Parse(wikitext);
            StringBuilder sb = new();
            foreach (var line in ast.Lines)
            {
                if (line.GetType() == typeof(Paragraph) && line.ToPlainText().StartsWith("[["))
                    continue;//non inserisco i paragrafi delle illustrazioni
                var children = line.EnumChildren();
                foreach (var child in children)
                {
                    string childText = child.ToPlainText();
                    if (child.GetType() == typeof(Template))//in questo caso si effettua un parsing manuale, ad esempio per gestire: https://www.mediawiki.org/wiki/Help:Magic_words#Formatting
                    {
                        string? elemento = child.ToString();
                        List<string> paroleChiave = ["vedi"];
                        string? result = elemento != null ? paroleChiave.FirstOrDefault((_) => elemento.Contains(_, StringComparison.CurrentCultureIgnoreCase)) : null;
                        if (elemento != null && result == null)//il child non contiene le parole chiave
                        {
                            //posso inserire il contenuto
                            int startIndex = elemento.IndexOfAny([' ', ':']);//l'ordine conta
                            startIndex = (startIndex == -1) ? elemento.LastIndexOf('{') : startIndex;//se non trovo il punto di inizio del contenuto assumo che ci siano due {{
                            int stopIndex = elemento.IndexOfAny(['|', '}']);//l'ordine conta
                            int lunghezzaContenuto = stopIndex - startIndex - 1;
                            string contenuto = elemento.Substring(startIndex + 1, lunghezzaContenuto);
                            sb.Append(contenuto);
                        }
                    }
                    else if (child.GetType() == typeof(WikiLink))//quando è un WikiLink non stampo i riferimenti a file, thumb e alt, etc.
                    {
                        List<string> paroleChiave = new() { "file", "thumb", "alt" };
                        string? result = paroleChiave.FirstOrDefault((_) => childText.Contains(_, StringComparison.CurrentCultureIgnoreCase));
                        if (result == null)//il childText non contiene le parole chiave
                        {
                            sb.Append(childText);
                        }
                    }
                    else //child.GetType()!= WikiLink && child.GetType()!=Template
                    {
                        sb.Append(childText);
                    }
                }
                if (line.GetType() == typeof(Heading) || line.GetType() == typeof(Paragraph))//quando sono alla fine di un'intestazione oppure di un paragrafo decido se andare a capo
                {
                    if (!string.IsNullOrWhiteSpace(line.ToPlainText()))
                    {//controllo che ci sia un contenuto nella riga corrente per andare a capo
                        sb.Append('\n');
                    }
                }
            }
            return sb.ToString();
        }
        /// <summary>
        /// Converte un testo in formato wikitext in testo leggibile.
        /// Per ogni linea nel wikitext viene restituita una stringa risultato.
        /// A differenza del metodo WikiTextToReadableText, questo restituisce un array di stringhe
        /// </summary>
        /// <param name="wikitext">Il wikitext in input</param>
        /// <returns>Un array di stringhe, ciascuna con testo leggibile. Ogni stringa restituita corrisponde a una linea all'interno del AST (Abstract Syntax Tree) del wikitext parser</returns>
        public static string[] WikiTextToReadableTextArray(this string wikitext)
        {
            //https://github.com/CXuesong/MwParserFromScratch
            var parser = new WikitextParser();
            var ast = parser.Parse(wikitext);
            StringBuilder sb = new();
            List<string> readableLines = new();
            foreach (var line in ast.Lines)
            {
                sb.Clear();//ripulisco lo StringBuilder per la linea in corso
                if (line.GetType() == typeof(Paragraph) && line.ToPlainText().StartsWith("[["))
                    continue;//non inserisco i paragrafi delle illustrazioni
                var children = line.EnumChildren();
                foreach (var child in children)
                {
                    string childText = child.ToPlainText();
                    if (string.IsNullOrWhiteSpace(childText) || childText.Equals("\n"))//non inserisco elementi vuoti o con solo a capo
                    {
                        continue;
                    }
                    else if (child.GetType() == typeof(Template))//in questo caso si effettua un parsing manuale, ad esempio per gestire: https://www.mediawiki.org/wiki/Help:Magic_words#Formatting
                    {
                        string? elemento = child.ToString();
                        List<string> paroleChiave = ["vedi"];
                        string? result = elemento != null ? paroleChiave.FirstOrDefault((_) => elemento.Contains(_, StringComparison.CurrentCultureIgnoreCase)) : null;
                        if (elemento != null && result == null)//il child non contiene le parole chiave
                        {
                            //posso inserire il contenuto
                            int startIndex = elemento.IndexOfAny([' ', ':']);//l'ordine conta
                            startIndex = (startIndex == -1) ? elemento.LastIndexOf('{') : startIndex;//se non trovo il punto di inizio del contenuto assumo che ci siano due {{
                            int stopIndex = elemento.IndexOfAny(['|', '}']);//l'ordine conta
                            int lunghezzaContenuto = stopIndex - startIndex - 1;
                            string contenuto = elemento.Substring(startIndex + 1, lunghezzaContenuto);
                            sb.Append(contenuto);
                        }
                    }
                    else if (child.GetType() == typeof(WikiLink))//quando è un WikiLink non stampo i riferimenti a file, thumb e alt, etc.
                    {
                        List<string> paroleChiave = ["file", "thumb", "alt"];
                        string? result = paroleChiave.FirstOrDefault((_) => childText.Contains(_, StringComparison.CurrentCultureIgnoreCase));
                        if (result == null)//il childText non contiene le parole chiave
                        {
                            sb.Append(childText);
                        }
                    }
                    else //child.GetType()!= WikiLink && child.GetType()!=Template
                    {
                        sb.Append(childText);
                    }
                }
                if (sb.Length > 0)
                {
                    readableLines.Add(sb.ToString());
                }
            }
            return [.. readableLines];
        }
        /// <summary>
        /// Converte un testo in formato wikitext in testo leggibile. Vengono rimossi gli spazi corrispondenti a new line
        /// </summary>
        /// <param name="wikitext">Il wikitext in input</param>
        /// <returns>La stringa corrispondente al testo leggibile</returns>
        public static string WikiTextToReadableTextNoSpace(this string wikitext)
        {
            //https://github.com/CXuesong/MwParserFromScratch
            var parser = new WikitextParser();
            var ast = parser.Parse(wikitext);
            StringBuilder sb = new();
            foreach (var line in ast.Lines)
            {
                if (line.GetType() == typeof(Paragraph) && line.ToPlainText().StartsWith("[["))
                    continue;//non inserisco i paragrafi delle illustrazioni
                var children = line.EnumChildren();
                foreach (var child in children)
                {
                    string childText = child.ToPlainText();
                    if (string.IsNullOrWhiteSpace(childText) || childText.Equals("\n"))
                    {
                        continue;
                    }
                    else if (child.GetType() == typeof(Template))//in questo caso si effettua un parsing manuale, ad esempio per gestire: https://www.mediawiki.org/wiki/Help:Magic_words#Formatting
                    {
                        string? elemento = child.ToString();
                        List<string> paroleChiave = ["vedi"];
                        string? result = elemento != null ? paroleChiave.FirstOrDefault((_) => elemento.Contains(_, StringComparison.CurrentCultureIgnoreCase)) : null;
                        if (elemento != null && result == null)//il child non contiene le parole chiave
                        {
                            //posso inserire il contenuto
                            int startIndex = elemento.IndexOfAny([' ', ':']);//l'ordine conta
                            startIndex = (startIndex == -1) ? elemento.LastIndexOf('{') : startIndex;//se non trovo il punto di inizio del contenuto assumo che ci siano due {{
                            int stopIndex = elemento.IndexOfAny(['|', '}']);//l'ordine conta
                            int lunghezzaContenuto = stopIndex - startIndex - 1;
                            string contenuto = elemento.Substring(startIndex + 1, lunghezzaContenuto);
                            sb.Append(contenuto);
                        }
                    }
                    else if (child.GetType() == typeof(WikiLink))//quando è un WikiLink non stampo i riferimenti a file, thumb e alt, etc.
                    {
                        List<string> paroleChiave = ["file", "thumb", "alt"];
                        string? result = paroleChiave.FirstOrDefault((_) => childText.Contains(_, StringComparison.CurrentCultureIgnoreCase));
                        if (result == null)//il childText non contiene le parole chiave
                        {
                            sb.Append(childText);
                        }
                    }
                    else //child.GetType()!= WikiLink && child.GetType()!=Template
                    {
                        sb.Append(childText);
                    }
                }
                //if (line.GetType() == typeof(Heading) || line.GetType() == typeof(Paragraph))//quando sono alla fine di un'intestazione oppure di un paragrafo decido se andare a capo
                //{
                //    if (!string.IsNullOrWhiteSpace(line.ToPlainText()))
                //    {//controllo che ci sia un contenuto nella riga corrente per andare a capo
                //        sb.Append('\n');
                //    }
                //}
            }
            return sb.ToString();
        }
        /// <summary>
        /// Effettua lo split di una stringa di testo in un array di stringhe, usando il punto come separatore.
        /// Il punto non è rimosso dal risultato
        /// </summary>
        /// <param name="text">Testo che si vuole suddividere in più stringhe</param>
        /// <returns>Array di stringhe ottenuto facendo lo split sul punto</returns>
        public static string[] SplitOnPeriod(this string text)
        {
            //return text.Split(separators, StringSplitOptions.RemoveEmptyEntries);//questo funziona,ma toglie i punti
            List<string> afterSplit = [];//lista contenente le frasi separate da .
            int start = 0;//indice di inizio frase
            for (int counter = 0; counter < text.Length; counter++)
            {
                if (text[counter] == '.')//se trovo un punto
                {
                    int lineLength = counter - start + 1;
                    afterSplit.Add(text.Substring(start, lineLength));
                    start = counter + 1;//aggiorno start
                }
            }
            if (start < text.Length)//se, uscito dal ciclo, start è < di text.Length vuol dire che l'ultimo pezzo del testo non è stato incluso, perché non c'era il punto finale
            {
                afterSplit.Add(text[start..]);
            }
            return [.. afterSplit];
        }
    }
}
```

//file di progetto:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="CXuesong.MW.MwParserFromScratch" Version="0.3.0-int.6" />
  </ItemGroup>
</Project>
```

Attenzione al fatto che bisogna utilizzare la versione pre-release della libreria

Per testare la libreria è stato creato il progetto **WikitextParsingDemo**:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
      <ItemGroup>
            <ProjectReference Include="..\WikitextExtensions\WikitextExtensions.csproj" />
      </ItemGroup>
</Project>
```

```csharp
//File Program.cs
using WikitextExtensions;
namespace WikitextParsingDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            string wikitext = "=== Opere del periodo napoletano ===\n{{vedi anche|Opere della giovinezza di Giovanni Boccaccio}}\n\nTra le sue prime opere del periodo napoletano vengono ricordate: ''[[Caccia di Diana]]'' (1334 circa)<ref>{{Cita|Branca 1977|p. 41}}.</ref>, ''[[Filostrato (poema)|Filostrato]]'' (1335), il ''[[Filocolo]]'' (1336-38)<ref>{{Cita|Branca 1977|p. 44}}.</ref>, ''[[Teseida]]'' (1339-41)<ref>{{Cita|Branca 1977|p. 49}}.</ref>.\n\n==== ''La Caccia di Diana'' (1333--1334) ====\n{{vedi anche|Caccia di Diana}}\n\nLa ''[[Caccia di Diana]]'' è un poemetto di 18 [[Canto (metrica)|canti]] in [[Terzina dantesca|terzine dantesche]] che celebra in chiave mitologica alcune gentildonne napoletane. Le ninfe, seguaci della casta [[Diana]], si ribellano alla dea e offrono le loro prede di caccia a [[Venere (divinità)|Venere]], che trasforma gli animali in bellissimi uomini. Tra questi vi è anche il giovane Boccaccio che, grazie all'amore, diviene un uomo pieno di virtù: il poemetto propone, dunque, la concezione cortese e [[Dolce stil novo|stilnovistica]] dell'amore che ingentilisce e nobilita l'essere umano<ref>{{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-caccia-di-diana-analisi-e-commento-4334.html|titolo = Boccaccio, "La Caccia di Diana": analisi e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== Il ''Filostrato'' (1335) ====\n{{vedi anche|Filostrato (poema)}}\n[[File:Boccaccio Altonensis 1.jpg|miniatura|Codice riportante un passo del ''Filostrato''. ''Codex Christianei'', conservato nella Bibliotheca Gymnasii Altonani ([[Amburgo]])]]\n\nIl ''[[Filostrato (poema)|Filostrato]]'' (che alla lettera dovrebbe significare nel [[lingua greca|greco]] approssimativo del Boccaccio «vinto d'amore») è un poemetto scritto in [[ottava rima|ottave]] che narra la tragica storia di [[Troilo]], figlio del [[re di Troia]] [[Priamo]], che si era innamorato della principessa greca [[Criseide]]. La donna, in seguito a uno scambio di prigionieri, torna al campo greco, e dimentica Troilo. Quando Criseide in seguito s'innamora di Diomede, Troilo si dispera e va incontro alla morte per mano di [[Achille]]. Nell'opera l'autore si confronta in maniera diretta con la precedente tradizione dei «cantari», fissando i parametri per un nuovo tipo di ottava essenziale per tutta la letteratura italiana fino al [[XVII secolo|Seicento]]<ref>{{Cita|Branca 1977|pp. 42-43}}.</ref>. Il linguaggio adottato è difficile, altolocato, spedito, a differenza di quello presente nel ''Filocolo'', in cui è molto sovrabbondante<ref>Per il ''Filostrato'' in generale, si veda: {{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/filostrato-boccaccio-trama-4331.html|titolo = Boccaccio, "Il Filostrato": riassunto e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== Il ''Filocolo'' (1336-1339) ====\n{{vedi anche|Filocolo}}\n\nIl ''[[Filocolo]]'' (secondo un'etimologia approssimativa «fatica d'amore») è un romanzo in prosa: rappresenta una svolta rispetto ai romanzi delle origini scritti in versi. La storia ha come protagonisti Florio, figlio di un re saraceno, e Biancifiore (o Biancofiore), una schiava cristiana abbandonata da bambina. I due fanciulli crescono assieme e da grandi, in seguito alla lettura del libro di [[Publio Ovidio Nasone|Ovidio]] ''[[Ars amatoria|Ars Amandi]]'' s'innamorano, come era successo per [[Paolo e Francesca]] dopo avere letto ''[[Ginevra (ciclo arturiano)|Ginevra]] e [[Lancillotto]]''. Tuttavia il padre di Florio decide di separarli vendendo Biancifiore a dei mercanti. Florio decide quindi di andarla a cercare e dopo mille peripezie (da qui il titolo ''Filocolo'') la rincontra. Infine, il giovane si converte al [[cristianesimo]] e sposa la fanciulla<ref>{{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-filocolo-trama-4361.html|titolo = Boccaccio, "Il Filocolo": riassunto e commento|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.\n\n==== ''Teseida delle nozze d'Emilia'' (1339-1340) ====\n{{vedi anche|Teseida}}\n[[File:Emilia in the rosegarden (Teseida).jpg|thumb|upright=1.5|''Emilia nel roseto'', manoscritto francese del 1460 ca.|alt=]]\n\nIl ''[[Teseida]]'' è un poema epico in ottave in cui si rievocano le gesta di [[Teseo]] che combatte contro [[Tebe (città greca antica)|Tebe]] e le [[Amazzoni]]. L'opera costituisce il primo caso in assoluto nella storia letteraria in lingua italiana di poema epico in volgare e già si manifesta la tendenza di Boccaccio a isolare nuclei narrativi sentimentali, cosicché il vero centro della narrazione finisce per essere l'amore dei prigionieri tebani [[Arcita]] e [[Palemone (divinità)|Palemone]], molto amici, per Emilia, regina delle Amazzoni e cognata di Teseo; il duello fra i due innamorati si conclude con la morte di Arcita e le nozze tra Palemone ed Emilia<ref>Per il ''Teseida'' in generale, si veda: {{Cita web|autore = Rachele Jesurum|url = http://www.oilproject.org/lezione/boccaccio-teseida-introduzione-e-commento-dell-opera-4392.html|titolo = Boccaccio, "Teseida": introduzione e commento dell'opera|accesso = 23 giugno 2015|editore = Oilproject}}</ref>.";
            Console.WriteLine("**************OUTPUT IN FORMATO WIKITEXT**************");
            Console.WriteLine(wikitext);
            Console.WriteLine("\n\n**************OUTPUT LEGGIBILE**************");
            string readableText = wikitext.WikiTextToReadableTextNoSpace();
            Console.WriteLine(readableText);
            //string[] readableText = wikitext.WikiTextToReadableTextArray();
            //string[] readableText = wikitext.WikiTextToReadableTextNoSpace().SplitOnPeriod();
            //foreach (var item in readableText)
            //{
            //    Console.WriteLine(item);
            //}
        }
    }
}
```

Il risultato leggibile è il seguente:

*Opere del periodo napoletano Tra le sue prime opere del periodo napoletano vengono ricordate: Caccia di Diana (1334 circa), Filostrato (1335), il Filocolo (1336-38), Teseida (1339-41).*

*La Caccia di Diana (1333-1334) La Caccia di Diana è un poemetto di 18 canti in terzine dantesche che celebra in chiave mitologica alcune gentildonne napoletane. Le ninfe, seguaci della casta Diana, si ribellano alla dea e offrono le loro prede di caccia a Venere, che trasforma gli animali in bellissimi uomini. Tra questi vi è anche il giovane Boccaccio che, grazie all'amore, diviene un uomo pieno di virtù: il poemetto propone, dunque, la concezione cortese e stilnovistica dell'amore che ingentilisce e nobilita l'essere umano.*

 *Il Filostrato (1335) Codice riportante un passo del Filostrato. Codex Christianei, conservato nella Bibliotheca Gymnasii Altonani (Amburgo)Il Filostrato (che alla lettera dovrebbe significare nel greco approssimativo del Boccaccio «vinto d'amore») è un poemetto scritto in ottave che narra la tragica storia di Troilo, figlio del re di TroiaPriamo, che si era innamorato della principessa greca Criseide. La donna, in seguito a uno scambio di prigionieri, torna al campo greco, e dimentica Troilo. Quando Criseide in seguito s'innamora di Diomede, Troilo si dispera e va incontro alla morte per mano di Achille. Nell'opera l'autore si confronta in maniera diretta con la precedente tradizione dei «cantari», fissando i parametri per un nuovo tipo di ottava essenziale per tutta la letteratura italiana fino al Seicento. Il linguaggio adottato è difficile, altolocato, spedito, a differenza di quello presente nel Filocolo, in cui è molto sovrabbondante.*

 *Il Filocolo (1336-1339) Il Filocolo (secondo un'etimologia approssimativa «fatica d'amore») è un romanzo in prosa: rappresenta una svolta rispetto ai romanzi delle origini scritti in versi. La storia ha come protagonisti Florio, figlio di un re saraceno, e Biancifiore (o Biancofiore), una schiava cristiana abbandonata da bambina. I due fanciulli crescono assieme e da grandi, in seguito alla lettura del libro di OvidioArs Amandi s'innamorano, come era successo per Paolo e Francesca dopo avere letto Ginevra e Lancillotto. Tuttavia il padre di Florio decide di separarli vendendo Biancifiore a dei mercanti. Florio decide quindi di andarla a cercare e dopo mille peripezie (da qui il titolo Filocolo) la rincontra. Infine, il giovane si converte al cristianesimo e sposa la fanciulla.*

*Teseida delle nozze d'Emilia (1339-1340) Il Teseida è un poema epico in ottave in cui si rievocano le gesta di Teseo che combatte contro Tebe e le Amazzoni. L'opera costituisce il primo caso in assoluto nella storia letteraria in lingua italiana di poema epico in volgare e già si manifesta la tendenza di Boccaccio a isolare nuclei narrativi sentimentali, cosicché il vero centro della narrazione finisce per essere l'amore dei prigionieri tebani Arcita e Palemone, molto amici, per Emilia, regina delle Amazzoni e cognata di Teseo; il duello fra i due innamorati si conclude con la morte di Arcita e le nozze tra Palemone ed Emilia.*

## Microsoft Azure

[**https://azure.microsoft.com/it-it/**](https://azure.microsoft.com/it-it/)

[**https://it.wikipedia.org/wiki/Microsoft_Azure_(piattaforma)**](https://it.wikipedia.org/wiki/Microsoft_Azure_(piattaforma))

**Microsoft Azure** è la [piattaforma](https://it.wikipedia.org/wiki/Piattaforma_(informatica) "Piattaforma (informatica)") [cloud](https://it.wikipedia.org/wiki/Cloud_computing "Cloud computing") pubblica di [Microsoft](https://it.wikipedia.org/wiki/Microsoft "Microsoft"), che offre servizi di [cloud computing](https://it.wikipedia.org/wiki/Cloud_computing "Cloud computing").

Tramite Azure vengono erogati servizi appartenenti a diverse categorie[^[2]^](https://it.wikipedia.org/wiki/Microsoft_Azure_(piattaforma)#cite_note-2) quali: risorse di elaborazione, archiviazione e memorizzazione dati, trasmissione dati e interconnessione di reti, analisi, intelligence, [apprendimento automatico](https://it.wikipedia.org/wiki/Apprendimento_automatico "Apprendimento automatico") sicurezza e gestione delle identità, monitoraggio e gestione, nonché servizi per lo sviluppo di applicazioni.

Il numero e il tipo dei servizi erogati vengono modificati da Microsoft con cadenza periodica.

I servizi messi a disposizione da Microsoft Azure possono essere classificati in tre aree, a seconda della modalità di erogazione adottata: [Infrastructure as a Service](https://it.wikipedia.org/wiki/Infrastructure_as_a_service "Infrastructure as a service") (IaaS), [Platform as a Service](https://it.wikipedia.org/wiki/Platform_as_a_service "Platform as a service") (PaaS) e infine [Software as a Service](https://it.wikipedia.org/wiki/Software_as_a_service "Software as a service") (SaaS). Fornisce anche servizi di [mBaaS](https://it.wikipedia.org/wiki/Backend_as_a_service "Backend as a service") (*mobile Backend as a Service*).

### Sottoscrizione studenti per Azure

<https://azure.microsoft.com/it-it/free/students/>

Si utilizzi l'account Microsoft della scuola e si segua la procedura di iscrizione gratuita.

Una volta completata l'iscrizione, risulta disponibile un credito virtuale di €100, spendibile in servizi a pagamento, oltre all'accesso a una lunga serie di servizi (alcuni dei quali gratuiti):

<https://learn.microsoft.com/en-us/azure/architecture/guide/technology-choices/technology-choices-overview>

## Azure Maps (coming soon)

<https://learn.microsoft.com/en-us/azure/azure-maps/>

<https://azure.microsoft.com/it-it/products/azure-maps>

<https://learn.microsoft.com/en-us/azure/azure-maps/how-to-manage-authentication>


