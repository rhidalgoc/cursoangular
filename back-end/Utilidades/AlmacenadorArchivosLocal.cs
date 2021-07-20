using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace back_end.Utilidades
{
    public class AlmacenadorArchivosLocal : IAlmacenadorArchivos
    {
        private readonly IWebHostEnvironment env;
        private readonly IHttpContextAccessor httpcontextAccesor;
        public AlmacenadorArchivosLocal(IWebHostEnvironment env, IHttpContextAccessor httpcontextAccesor)
        {
            this.env = env;
            this.httpcontextAccesor = httpcontextAccesor;
        }
        public Task BorrarArchivo(string ruta, string contenedor)
        {
            if (string.IsNullOrEmpty(ruta))
            {
                return Task.CompletedTask;
            }
            var nombreArchivo = Path.GetFileName(ruta);
            var directorioArchivo = Path.Combine(env.WebRootPath, contenedor, nombreArchivo);

            if (File.Exists(directorioArchivo))
            {
                File.Delete(directorioArchivo);
            }
            return Task.CompletedTask;
        }
        public async Task<string> EditarArchivo(string contenedor, IFormFile archivo, string ruta)
        {
            await BorrarArchivo(ruta, contenedor);
            return await GuardarArchivo(contenedor, archivo);
        }
        public async Task<string> GuardarArchivo(string contenedor, IFormFile archivo)
        {
            var extension = Path.GetExtension(archivo.FileName);
            var nombreArchivo = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(env.WebRootPath, contenedor);

            // si no existe el directorio lo vamos a crear
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
                string ruta = Path.Combine(folder, nombreArchivo);
                using (var memoryStream = new MemoryStream())
                {
                    // tenemos el arreay de bytes que representa nuestro archivo
                    await archivo.CopyToAsync(memoryStream);
                    var contenido = memoryStream.ToArray();
                    await File.WriteAllBytesAsync(ruta, contenido);
                }
                var urlActual = $"{httpcontextAccesor.HttpContext.Request.Scheme}://{httpcontextAccesor.HttpContext.Request.Host}";
                var rutaParaDB = Path.Combine(urlActual, contenedor, nombreArchivo).Replace("\\", "/");
                return rutaParaDB;
        }
    }
}
