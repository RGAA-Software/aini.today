using Aini.Domain;

namespace Aini.UnitTests;

public sealed class ReadingLevelTests
{
    [Fact]
    public void Constructor_NormalizesValues()
    {
        var level = new ReadingLevel(" Level 1 ", " A1 ", 1);

        Assert.Equal("Level 1", level.Code);
        Assert.Equal("A1", level.Cefr);
        Assert.Equal(1, level.Order);
    }

    [Fact]
    public void Constructor_RejectsMissingCode()
    {
        Assert.Throws<ArgumentException>(() => new ReadingLevel(" ", "A1", 1));
    }
}
