using System;
using System.Collections.Generic;

namespace TecnoPartes.Tests
{
    public class TestRunner
    {
        private List<TestResult> _results = new();
        private string _currentTestSuite = "";

        public void StartTestSuite(string suiteName)
        {
            _currentTestSuite = suiteName;
            Console.WriteLine($"\n🧪 Ejecutando tests para: {suiteName}");
            Console.WriteLine(new string('=', 50));
        }

        public void Test(string testName, Action testAction)
        {
            try
            {
                testAction.Invoke();
                _results.Add(new TestResult { TestName = $"{_currentTestSuite} - {testName}", Passed = true });
                Console.WriteLine($"✅ {testName} - PASÓ");
            }
            catch (Exception ex)
            {
                _results.Add(new TestResult { TestName = $"{_currentTestSuite} - {testName}", Passed = false, ErrorMessage = ex.Message });
                Console.WriteLine($"❌ {testName} - FALLÓ: {ex.Message}");
            }
        }

        public void Assert(bool condition, string message = "Aserción falló")
        {
            if (!condition)
            {
                throw new Exception(message);
            }
        }

        public void AssertEqual<T>(T expected, T actual, string message = "")
        {
            if (!EqualityComparer<T>.Default.Equals(expected, actual))
            {
                var errorMessage = string.IsNullOrEmpty(message) 
                    ? $"Esperado: {expected}, pero fue: {actual}"
                    : $"{message}. Esperado: {expected}, pero fue: {actual}";
                throw new Exception(errorMessage);
            }
        }

        public void AssertNotNull<T>(T value, string message = "El valor no debería ser nulo")
        {
            if (value == null)
            {
                throw new Exception(message);
            }
        }

        public void ShowResults()
        {
            Console.WriteLine("\n📊 RESUMEN DE TESTS:");
            Console.WriteLine(new string('=', 50));
            
            int passed = 0;
            int failed = 0;

            foreach (var result in _results)
            {
                if (result.Passed)
                {
                    passed++;
                }
                else
                {
                    failed++;
                    Console.WriteLine($"❌ {result.TestName}: {result.ErrorMessage}");
                }
            }

            Console.WriteLine($"\n✅ Tests que pasaron: {passed}");
            Console.WriteLine($"❌ Tests que fallaron: {failed}");
            Console.WriteLine($"📈 Total de tests: {_results.Count}");
            
            if (failed == 0)
            {
                Console.WriteLine("\n🎉 ¡Todos los tests pasaron exitosamente!");
            }
            else
            {
                Console.WriteLine($"\n⚠️  {failed} tests fallaron. Revisa los errores arriba.");
            }
        }
    }

    public class TestResult
    {
        public string TestName { get; set; } = "";
        public bool Passed { get; set; }
        public string ErrorMessage { get; set; } = "";
    }
} 