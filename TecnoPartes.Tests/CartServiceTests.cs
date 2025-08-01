using P1F_TecnoPartes.Services;

namespace TecnoPartes.Tests
{
    public class CartServiceTests
    {
        private readonly TestRunner _testRunner;

        public CartServiceTests(TestRunner testRunner)
        {
            _testRunner = testRunner;
        }

        public void RunAllTests()
        {
            _testRunner.StartTestSuite("CartService");

            _testRunner.Test("Debería crear carrito vacío inicialmente", TestEmptyCartInitially);
            _testRunner.Test("Debería agregar nuevo item al carrito", TestAddNewItem);
            _testRunner.Test("Debería incrementar cantidad al agregar item existente", TestAddExistingItem);
            _testRunner.Test("Debería calcular total de items correctamente", TestTotalItemsCalculation);
            _testRunner.Test("Debería calcular precio total correctamente", TestTotalPriceCalculation);
            _testRunner.Test("Debería remover item del carrito", TestRemoveItem);
            _testRunner.Test("Debería decrementar cantidad al remover item con múltiples cantidades", TestRemoveItemWithMultipleQuantity);
            _testRunner.Test("Debería limpiar todos los items del carrito", TestClearCart);
            _testRunner.Test("Debería manejar remoción de item no existente correctamente", TestRemoveNonExistentItem);
        }

        private void TestEmptyCartInitially()
        {
            var cartService = new CartService();

            _testRunner.AssertEqual(0, cartService.Items.Count, "El carrito debería estar vacío inicialmente");
            _testRunner.AssertEqual(0, cartService.TotalItems, "El total de items debería ser 0");
            _testRunner.AssertEqual(0m, cartService.TotalPrice, "El precio total debería ser 0");
        }

        private void TestAddNewItem()
        {
            var cartService = new CartService();

            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            _testRunner.AssertEqual(1, cartService.Items.Count, "Debería tener 1 item en el carrito");
            _testRunner.AssertEqual(1, cartService.TotalItems, "El total de items debería ser 1");
            _testRunner.AssertEqual(500.00m, cartService.TotalPrice, "El precio total debería ser 500.00");
            
            var item = cartService.Items.First();
            _testRunner.AssertEqual(1, item.Id, "El ID del item debería ser 1");
            _testRunner.AssertEqual("Procesador Intel", item.Name, "El nombre del item debería coincidir");
            _testRunner.AssertEqual(500.00m, item.Price, "El precio del item debería coincidir");
            _testRunner.AssertEqual(1, item.Quantity, "La cantidad del item debería ser 1");
        }

        private void TestAddExistingItem()
        {
            var cartService = new CartService();
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            _testRunner.AssertEqual(1, cartService.Items.Count, "Debería seguir teniendo 1 item único en el carrito");
            _testRunner.AssertEqual(2, cartService.TotalItems, "El total de items debería ser 2");
            _testRunner.AssertEqual(1000.00m, cartService.TotalPrice, "El precio total debería ser 1000.00");
            
            var item = cartService.Items.First();
            _testRunner.AssertEqual(2, item.Quantity, "La cantidad del item debería ser 2");
        }

        private void TestTotalItemsCalculation()
        {
            var cartService = new CartService();

            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");
            cartService.AddItem(2, "RAM Corsair", 150.00m, "/images/ram.jpg");
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            _testRunner.AssertEqual(3, cartService.TotalItems, "El total de items debería ser 3 (2 procesadores + 1 RAM)");
        }

        private void TestTotalPriceCalculation()
        {
            var cartService = new CartService();

            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");
            cartService.AddItem(2, "RAM Corsair", 150.00m, "/images/ram.jpg");
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            _testRunner.AssertEqual(1150.00m, cartService.TotalPrice, "El precio total debería ser 1150.00");
        }

        private void TestRemoveItem()
        {
            var cartService = new CartService();
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            cartService.RemoveItem(1);

            _testRunner.AssertEqual(0, cartService.Items.Count, "El carrito debería estar vacío después de remover el único item");
            _testRunner.AssertEqual(0, cartService.TotalItems, "El total de items debería ser 0");
            _testRunner.AssertEqual(0m, cartService.TotalPrice, "El precio total debería ser 0");
        }

        private void TestRemoveItemWithMultipleQuantity()
        {
            var cartService = new CartService();
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            cartService.RemoveItem(1);

            _testRunner.AssertEqual(1, cartService.Items.Count, "Debería seguir teniendo el item en el carrito");
            _testRunner.AssertEqual(1, cartService.TotalItems, "El total de items debería ser 1");
            _testRunner.AssertEqual(500.00m, cartService.TotalPrice, "El precio total debería ser 500.00");
            
            var item = cartService.Items.First();
            _testRunner.AssertEqual(1, item.Quantity, "La cantidad del item debería decrementarse a 1");
        }

        private void TestClearCart()
        {
            var cartService = new CartService();
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");
            cartService.AddItem(2, "RAM Corsair", 150.00m, "/images/ram.jpg");

            cartService.ClearCart();

            _testRunner.AssertEqual(0, cartService.Items.Count, "El carrito debería estar vacío después de limpiar");
            _testRunner.AssertEqual(0, cartService.TotalItems, "El total de items debería ser 0");
            _testRunner.AssertEqual(0m, cartService.TotalPrice, "El precio total debería ser 0");
        }

        private void TestRemoveNonExistentItem()
        {
            var cartService = new CartService();
            cartService.AddItem(1, "Procesador Intel", 500.00m, "/images/procesador.jpg");

            cartService.RemoveItem(999);

            _testRunner.AssertEqual(1, cartService.Items.Count, "El carrito debería seguir teniendo el item original");
            _testRunner.AssertEqual(1, cartService.TotalItems, "El total de items debería seguir siendo 1");
            _testRunner.AssertEqual(500.00m, cartService.TotalPrice, "El precio total debería permanecer en 500.00");
        }
    }
} 