using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Filtros
{
    public class FiltroDeException:ExceptionFilterAttribute
    {
        private readonly ILogger<FiltroDeException> logger;

        public FiltroDeException(ILogger<FiltroDeException> logger)
        {
            this.logger = logger;
        }

        // estoy atrapando cualquier error que no haya sido atrapado por un Try catch por ejemplo
        public override void OnException(ExceptionContext context)
        {
            logger.LogError(context.Exception, context.Exception.Message);
            base.OnException(context);
        }
    }
}
