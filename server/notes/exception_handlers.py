from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    try:
        if response is not None:
            customized_response = {}
            customized_response["errors"] = []

            for key, value in response.data.items():
                error = {"field": key, "message": value[0], "main": True}
                customized_response["errors"] = error

            response.data = customized_response
    except:
        pass

    return response
