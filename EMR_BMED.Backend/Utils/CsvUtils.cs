using System.Globalization;
using CsvHelper;
using CsvHelper.Configuration.Attributes;
using EMR_BMED.Backend.Models;

namespace EMR_BMED.Backend.Utils
{
  public static class CsvUtils
  {
    public static MedicationModel[] ImportMeds()
    {
      using StreamReader streamReader = new("meds.csv");
      using CsvReader csvReader = new(
        streamReader, CultureInfo.InvariantCulture);

      return csvReader
      .GetRecords<ImportedMed>()
      .Select((med) => new MedicationModel()
      {
        Name = med.Name,
        Form = med.Form,
        Method = "",
        IsPresRequired = med.IsPresRequired == "PR",
        Brand = med.Brand,
        Storing = med.Storing,
      })
      .ToArray();
    }
  }

  class ImportedMed
  {
    [Name("Denumire comerciala")]
    public required string Name { get; set; }

    [Name("Forma farmaceutica")]
    public required string Form { get; set; }

    [Name("Prescriptie")]
    public required string IsPresRequired { get; set; }

    [Name("Firma / tara producatoare APP")]
    public string? Brand { get; set; }

    [Name("Ambalaj")]
    public string? Storing { get; set; }
  }
}
