import re


def singleton(class_):
    instances = {}

    def getinstance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]

    return getinstance


@singleton
class Services:
    def uniq_user_identifier(self, meta):
        string = meta["REMOTE_ADDR"]
        try:
            string += f"-{meta['HTTP_USER_AGENT']}"
        except:
            pass
        return re.sub("\W+", "_", string)[:49]


if __name__ == "__main__":
    print(Services().uniq_user_identifier("some string here"))
