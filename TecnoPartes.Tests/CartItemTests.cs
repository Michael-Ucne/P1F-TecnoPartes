using P1F_TecnoPartes.Services;
using P1F_TecnoPartes.Models;

namespace TecnoPartes.Tests
{
    public class CartItemTests
    {
        private readonly TestRunner _testRunner;

        public CartItemTests(TestRunner testRunner)
        {
            _testRunner = testRunner;
        }

        public void RunAllTests()
        {
            _testRunner.StartTestSuite("CartItem");

            _testRunner.Test("Debería crear CartItem con valores por defecto", TestCartItemDefaultValues);
            _testRunner.Test("Debería configurar las propiedades correctamente", TestCartItemProperties);
            _testRunner.Test("Debería calcular el Total correctamente con cantidad 1", TestTotalCalculationSingleQuantity);
            _testRunner.Test("Debería calcular el Total correctamente con múltiples cantidades", TestTotalCalculationMultipleQuantity);
            _testRunner.Test("Debería manejar precios decimales correctamente", TestDecimalPrices);
            _testRunner.Test("Debería manejar precio cero", TestZeroPrice);
            _testRunner.Test("Debería manejar cantidad cero", TestZeroQuantity);
        }

        private void TestCartItemDefaultValues()
        {
            var cartItem = new CartItem();

            _testRunner.AssertEqual(0, cartItem.Id, "El Id por defecto debería ser 0");
            _testRunner.AssertEqual(string.Empty, cartItem.Name, "El Name por defecto debería ser cadena vacía");
            _testRunner.AssertEqual(0m, cartItem.Price, "El Price por defecto debería ser 0");
            _testRunner.AssertEqual(string.Empty, cartItem.Image, "El Image por defecto debería ser cadena vacía");
            _testRunner.AssertEqual(1, cartItem.Quantity, "La Quantity por defecto debería ser 1");
        }

        private void TestCartItemProperties()
        {
            var cartItem = new CartItem
            {
                Id = 123,
                Name = "Test Product",
                Price = 99.99m,
                Image = "/images/test.jpg",
                Quantity = 5
            };

            _testRunner.AssertEqual(123, cartItem.Id, "El Id debería configurarse correctamente");
            _testRunner.AssertEqual("Test Product", cartItem.Name, "El Name debería configurarse correctamente");
            _testRunner.AssertEqual(99.99m, cartItem.Price, "El Price debería configurarse correctamente");
            _testRunner.AssertEqual("/images/test.jpg", cartItem.Image, "El Image debería configurarse correctamente");
            _testRunner.AssertEqual(5, cartItem.Quantity, "La Quantity debería configurarse correctamente");
        }

        private void TestTotalCalculationSingleQuantity()
        {
            var cartItem = new CartItem
            {
                Price = 100.50m,
                Quantity = 1
            };

            _testRunner.AssertEqual(100.50m, cartItem.Total, "El Total debería ser igual al Price cuando la Quantity es 1");
        }

        private void TestTotalCalculationMultipleQuantity()
        {
            var cartItem = new CartItem
            {
                Price = 25.75m,
                Quantity = 4
            };

            _testRunner.AssertEqual(103.00m, cartItem.Total, "El Total debería ser Price * Quantity (25.75 * 4 = 103.00)");
        }

        private void TestDecimalPrices()
        {
            var cartItem = new CartItem
            {
                Price = 19.99m,
                Quantity = 3
            };

            _testRunner.AssertEqual(59.97m, cartItem.Total, "El Total debería manejar precios decimales correctamente (19.99 * 3 = 59.97)");
        }

        private void TestZeroPrice()
        {
            var cartItem = new CartItem
            {
                Price = 0m,
                Quantity = 10
            };

            _testRunner.AssertEqual(0m, cartItem.Total, "El Total debería ser 0 cuando el Price es 0, sin importar la cantidad");
        }

        private void TestZeroQuantity()
        {
            var cartItem = new CartItem
            {
                Price = 50.00m,
                Quantity = 0
            };

            _testRunner.AssertEqual(0m, cartItem.Total, "El Total debería ser 0 cuando la Quantity es 0, sin importar el precio");
        }
    }
} 