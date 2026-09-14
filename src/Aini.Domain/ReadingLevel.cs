namespace Aini.Domain;

public sealed record ReadingLevel
{
    public ReadingLevel(string code, string cefr, int order)
    {
        if (string.IsNullOrWhiteSpace(code))
        {
            throw new ArgumentException("A reading level code is required.", nameof(code));
        }

        if (order < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(order));
        }

        Code = code.Trim();
        Cefr = cefr.Trim();
        Order = order;
    }

    public string Code { get; }

    public string Cefr { get; }

    public int Order { get; }
}
