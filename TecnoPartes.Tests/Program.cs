using TecnoPartes.Tests;

namespace TecnoPartes.Tests
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("🚀 INICIANDO TESTS UNITARIOS PARA TECNOPARTES");
            Console.WriteLine("==============================================");
            Console.WriteLine($"📅 Fecha: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
            Console.WriteLine($"💻 Plataforma: {Environment.OSVersion}");
            Console.WriteLine();

            var testRunner = new TestRunner();

            try
            {
                var cartItemTests = new CartItemTests(testRunner);
                cartItemTests.RunAllTests();

                var cartServiceTests = new CartServiceTests(testRunner);
                cartServiceTests.RunAllTests();

                testRunner.ShowResults();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\n💥 ERROR CRÍTICO: {ex.Message}");
                Console.WriteLine($"📍 StackTrace: {ex.StackTrace}");
                Environment.Exit(1);
            }

            Console.WriteLine("\n🏁 Tests completados. Presiona cualquier tecla para salir...");
            Console.ReadKey();
        }
    }
} 